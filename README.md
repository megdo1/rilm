# Rilm AI

Plateforme de gouvernance et d'orchestration d'agents IA pour les entreprises. Permet de créer, déployer et superviser des agents IA métier dans une architecture multi-tenant sécurisée.

## Fonctionnalités

- **Marketplace d'agents** — catalogue d'agents IA prêts à l'emploi, installables et configurables par organisation
- **Workflow builder** — chaînage d'agents en séquence pour automatiser des processus métier complexes
- **Multi-tenant** — isolation des données par client, avec 4 rôles : `platform_admin`, `client_admin`, `developer`, `business`
- **Gouvernance IA** — charte d'usage obligatoire, règles éthiques, audit log de toutes les exécutions
- **Vue organisationnelle** — cartographie des agents par direction, département et processus (matrice, hiérarchique, timeline)
- **Connecteurs** — intégration avec CRM (Salesforce, HubSpot), ERP (SAP, Oracle), jobboards et outils de facturation
- **Monitoring** — tableau de bord des performances, taux de succès, tokens consommés

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | React 18 + Vite 6 + TypeScript + Tailwind CSS v4 |
| Composants UI | shadcn/ui + Radix UI |
| Auth & BDD | Supabase (PostgreSQL + Auth JWT) |
| Backend | Supabase Edge Functions (Deno + Hono) |
| Conteneurisation | Docker multi-stage + Nginx |

## Démarrage rapide

### Développement local

```bash
pnpm install
pnpm run dev
```

### Docker (recommandé)

```bash
cp .env.example .env
# Renseigner VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env
docker compose up -d --build
# App disponible sur http://localhost:3001
```

## Variables d'environnement

```env
VITE_SUPABASE_URL=https://<project-id>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

## Architecture

```
src/
├── app/
│   ├── App.tsx                    # Application principale (navigation par état)
│   ├── components/                # Vues par rôle et fonctionnalité
│   │   ├── LoginPage.tsx
│   │   ├── DashboardView.tsx
│   │   ├── AgentsView.tsx
│   │   ├── WorkflowBuilder.tsx
│   │   ├── MarketplaceView.tsx
│   │   ├── PlatformAdminView.tsx
│   │   └── ...
│   ├── supabase/functions/server/ # Edge Function Deno (API REST)
│   └── utils/
│       ├── mockData.ts            # Données de démonstration
│       └── supabase/              # Client Supabase
└── styles/                        # Design tokens + CSS global
```

## Comptes de test

Voir `src/app/COMPTES_TEST.md` — 4 comptes préconfigurés (un par rôle), créés automatiquement au premier login.

## État du projet

Prototype fonctionnel démo-ready (~40%). Back-end Supabase déployé avec KV store. LLM non connecté — exécution d'agents simulée. Roadmap back-end : schéma relationnel → intégration LLM → RLS multi-tenant → marketplace → connecteurs (~20-25 jours·dev).
