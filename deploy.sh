#!/bin/bash
set -e

VPS_HOST="51.77.145.184"
VPS_USER="ubuntu"
APP_NAME="rilm-ai"
IMAGE_NAME="rilm-ai:latest"
TAR_FILE="/tmp/rilm-ai.tar"
REMOTE_DIR="/opt/rilm"
PORT=3002

echo "=== Build image Docker ==="
if [ -z "$VITE_SUPABASE_URL" ] || [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
  if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
  else
    echo "ERREUR: .env manquant. Copier .env.example -> .env et renseigner les valeurs."
    exit 1
  fi
fi

docker build \
  --build-arg VITE_SUPABASE_URL="$VITE_SUPABASE_URL" \
  --build-arg VITE_SUPABASE_ANON_KEY="$VITE_SUPABASE_ANON_KEY" \
  -t "$IMAGE_NAME" .

echo "=== Export image vers tar ==="
docker save "$IMAGE_NAME" -o "$TAR_FILE"
echo "Image exportée : $(du -sh $TAR_FILE | cut -f1)"

echo "=== Transfert vers VPS $VPS_HOST ==="
scp "$TAR_FILE" "$VPS_USER@$VPS_HOST:/tmp/rilm-ai.tar"

echo "=== Déploiement sur VPS ==="
ssh "$VPS_USER@$VPS_HOST" bash << EOF
  set -e

  echo "--- Load image ---"
  docker load -i /tmp/rilm-ai.tar

  echo "--- Stop/remove ancien conteneur si existant ---"
  docker rm -f $APP_NAME 2>/dev/null || true

  echo "--- Démarrer nouveau conteneur ---"
  docker run -d \
    --name $APP_NAME \
    --restart unless-stopped \
    -p $PORT:80 \
    $IMAGE_NAME

  echo "--- Nettoyage tar ---"
  rm -f /tmp/rilm-ai.tar

  echo "--- Vérification ---"
  docker ps --filter "name=$APP_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
EOF

rm -f "$TAR_FILE"

echo ""
echo "=== Déploiement terminé ==="
echo "App disponible sur : http://$VPS_HOST:$PORT"
