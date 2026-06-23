# Rilm AI - Deploiement sur VPS OVH via SSH
# Usage : .\scripts\deploy-vps.ps1 [-VpsIp "51.77.145.184"] [-VpsUser "ubuntu"] [-SkipBuild]
# Prerequis : OpenSSH installe (Windows 10/11 inclus), cle SSH configuree pour le VPS

param(
    [string]$VpsIp   = "51.77.145.184",
    [string]$VpsUser = "ubuntu",
    [switch]$SkipBuild
)

$ErrorActionPreference = "Continue"
$Root      = Split-Path $PSScriptRoot -Parent
$ImageName = "rilm-ai:latest"
$TarPath   = "$Root\dist\rilm-ai.tar"
$RemoteDir = "/home/$VpsUser/rilm"
$Port      = 3002
$AppName   = "rilm-ai"

Write-Host ""
Write-Host "=== Rilm AI — Deploy VPS === $VpsUser@$VpsIp" -ForegroundColor Cyan
Write-Host ""

# 1. Verifier SSH
if (-not (Get-Command ssh -ErrorAction SilentlyContinue)) {
    Write-Error "SSH non trouve. Active OpenSSH : Parametres > Applications > Fonctionnalites optionnelles."
    exit 1
}

# 2. Charger le .env
$EnvFile = "$Root\.env"
if (-not (Test-Path $EnvFile)) {
    Write-Error ".env introuvable. Copier .env.example -> .env et renseigner les valeurs."
    exit 1
}

$envVars = @{}
Get-Content $EnvFile | Where-Object { $_ -match "^\s*[^#].*=.*" } | ForEach-Object {
    $parts = $_ -split "=", 2
    $envVars[$parts[0].Trim()] = $parts[1].Trim()
}

$SupabaseUrl  = $envVars["VITE_SUPABASE_URL"]
$SupabaseKey  = $envVars["VITE_SUPABASE_ANON_KEY"]

if (-not $SupabaseUrl -or -not $SupabaseKey) {
    Write-Error "VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY manquant dans .env"
    exit 1
}

# 3. Build image Docker
if (-not $SkipBuild) {
    Write-Host "Build image Docker..." -ForegroundColor Yellow
    docker build `
        --build-arg "VITE_SUPABASE_URL=$SupabaseUrl" `
        --build-arg "VITE_SUPABASE_ANON_KEY=$SupabaseKey" `
        -t $ImageName `
        "$Root"
    if ($LASTEXITCODE -ne 0) { Write-Error "Build Docker echoue."; exit 1 }
} else {
    Write-Host "SkipBuild — utilisation image existante $ImageName" -ForegroundColor DarkYellow
}

# 4. Export image en tar
Write-Host "Export image en tar..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "$Root\dist" | Out-Null
docker save $ImageName -o $TarPath
if ($LASTEXITCODE -ne 0) { Write-Error "Export tar echoue."; exit 1 }

$Size = [math]::Round((Get-Item $TarPath).Length / 1MB, 1)
Write-Host "Image exportee : $TarPath ($Size MB)" -ForegroundColor DarkGray

# 5. Preparer dossier distant
Write-Host "Preparation dossier distant $RemoteDir..." -ForegroundColor Yellow
ssh "$VpsUser@$VpsIp" "mkdir -p $RemoteDir"

# 6. Transfert SCP
Write-Host "Transfert SCP ($Size MB) vers $VpsIp..." -ForegroundColor Yellow
scp "$TarPath" "${VpsUser}@${VpsIp}:$RemoteDir/rilm-ai.tar"
if ($LASTEXITCODE -ne 0) { Write-Error "SCP echoue."; exit 1 }

# 7. Deploiement sur le VPS
Write-Host "Deploiement sur le VPS..." -ForegroundColor Yellow

$deployScript = @"
set -e
cd $RemoteDir

echo '--- Load image Docker ---'
docker load -i rilm-ai.tar

echo '--- Stop/remove ancien conteneur ---'
docker rm -f $AppName 2>/dev/null || true

echo '--- Demarrage conteneur port $Port ---'
docker run -d \
  --name $AppName \
  --restart unless-stopped \
  -p ${Port}:80 \
  $ImageName

echo '--- Nettoyage tar ---'
rm -f rilm-ai.tar

echo '--- Verification ---'
docker ps --filter "name=$AppName" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
"@

$deployScript | ssh "$VpsUser@$VpsIp" "bash -s"
if ($LASTEXITCODE -ne 0) { Write-Error "Deploiement echoue."; exit 1 }

# 8. Nettoyage local
Remove-Item $TarPath -Force

Write-Host ""
Write-Host "Deploy termine !" -ForegroundColor Green
Write-Host "  App : http://${VpsIp}:${Port}" -ForegroundColor Cyan
Write-Host ""
Write-Host "Logs : ssh $VpsUser@$VpsIp 'docker logs -f $AppName'" -ForegroundColor DarkGray
Write-Host ""
