# LCOM'LUNETTE - Application Web Premium

Ce dépôt contient le code source de l'application web du cabinet d'optique haut de gamme **LCOM'LUNETTE**. Le projet est conçu avec une architecture Next.js 15 (App Router), React 19, TypeScript et Tailwind CSS 4, couplé à un CMS Headless (Sanity v3) pour la gestion du contenu.

## 🚀 Technologies Principales

- **Framework :** [Next.js](https://nextjs.org/) (App Router, Server Components)
- **Langage :** [TypeScript](https://www.typescriptlang.org/)
- **Styling :** [Tailwind CSS v4](https://tailwindcss.com/)
- **CMS Headless :** [Sanity v3](https://www.sanity.io/)
- **Animations :** [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/), et [Lenis](https://lenis.studiofreight.com/) (Smooth Scrolling)
- **Formulaires :** [React Hook Form](https://react-hook-form.com/) avec validation [Zod](https://zod.dev/)
- **Déploiement :** [Vercel](https://vercel.com/)

## 🛠 Prérequis

- Node.js >= 18.17.0
- Compte Sanity (pour la gestion du CMS)
- Compte Vercel (pour le déploiement continu)

## 📦 Installation & Configuration

1. Cloner le dépôt :
   ```bash
   git clone <url-du-repo>
   cd lcom-lunette
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Variables d'environnement :
   Créer un fichier `.env.local` à la racine du projet avec les variables suivantes :
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_TOKEN=votre_token_securise
   NEXT_PUBLIC_SITE_URL=https://votre-site.com
   ```

## 💻 Développement

Lancer le serveur de développement Next.js :
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`.

### Accès au Studio Sanity
L'interface d'administration Sanity est intégrée directement au projet. Elle est accessible via la route `/studio` (par exemple : `http://localhost:3000/studio`).

## 🏗 Build & Déploiement

Le projet est configuré pour être déployé nativement sur Vercel. 
Chaque `git push` sur la branche principale déclenchera :
1. L'installation des dépendances.
2. L'audit de sécurité et le Linting.
3. Le Build de production `npm run build`.
4. Le déploiement global via le CDN Vercel.

## 🔒 Sécurité & Bonnes Pratiques

Ce projet respecte les recommandations de l'OWASP Top 10 :
- **Security Headers** stricts implémentés via `next.config.ts`.
- **Validation serveur** robuste via Zod.
- **Protection XSS** et prévention des attaques de Clickjacking.
- Aucun secret ou token de modification (API_TOKEN) n'est exposé côté client.

---
*Projet réalisé pour garantir l'excellence visuelle et une expérience utilisateur premium.*
