# Kolo

Plateforme de livraison de produits bio et locaux en circuit ultra-court, autour d’Abidjan.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Neon (PostgreSQL) + Vercel Blob — prévus, pas encore branchés
- Déploiement : Vercel

## Structure
- `/` — Accueil consommateur (découverte producteurs)
- `/producteurs/[slug]` — Fiche producteur
- `/panier` + `/commande` — Panier et tunnel de commande
- `/dashboard` — Dashboard producteur

## Maquette v1

Cette branche est une maquette cliquable. Toutes les données sont fictives (producteurs, prix, commandes). Aucun paiement réel, aucune base, aucun upload.

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000). Le panier est conservé dans `localStorage` (`kolo-cart`).

Codes promo simulés : `KOLO10` (−10 %) et `BIENVENUE` (−1 500 FCFA dès 5 000 FCFA).
