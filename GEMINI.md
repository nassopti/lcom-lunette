# Projet : LCOM'LUNETTE

Ce fichier sert de point de référence absolu pour comprendre l'architecture, les fonctionnalités et les règles de conception du projet. Il doit être lu par tout futur modèle IA avant d'effectuer des modifications.

## 1. Ce que l'application fait
LCOM'LUNETTE est une application web vitrine premium pour un cabinet d'optique haut de gamme basé à Abidjan. Elle permet :
- De présenter le catalogue de montures de luxe.
- De publier des articles et conseils optiques sous forme de blog.
- De partager des vidéos immersives (visites du cabinet, présentations).
- De collecter les avis et témoignages des clients.
- De faciliter la prise de rendez-vous (via une redirection WhatsApp).

Le contenu est intégralement piloté dynamiquement par un CMS headless (Sanity).

## 2. Toutes les fonctionnalités implémentées
- **Catalogue Dynamique :** Affichage des montures avec filtrage avancé (Marque, Sexe, Forme).
- **Blog (Conseils) :** Affichage d'articles avec estimation du temps de lecture.
- **Vidéos Immersives :** Galerie vidéo lue dans une modale dédiée sans quitter la page (optimisée pour éviter la surcharge réseau).
- **Avis Clients :** Formulaire de dépôt d'avis avec validation stricte (Zod). Les avis sont envoyés via une route API sécurisée vers Sanity (stockés en statut "brouillon" pour modération).
- **Studio CMS Intégré :** Interface d'administration Sanity directement accessible sur le site via `/studio`.
- **SEO & Découvrabilité :** Génération dynamique du sitemap (`/sitemap.ts`), du `robots.txt`, et intégration des balises Open Graph/Twitter Cards.
- **Performances (Code Splitting) :** Les composants lourds (modale vidéo, bannière de cookies, bouton WhatsApp) sont importés dynamiquement (`next/dynamic`) pour un temps de chargement (LCP) ultra-rapide.
- **Sécurité (OWASP) :** Implémentation stricte des *Security Headers* (HSTS, X-Frame-Options, XSS Protection) dans `next.config.ts`, et sécurisation des liens sortants (Tabnabbing).

## 3. La structure des fichiers
```text
/
├── src/
│   ├── app/
│   │   ├── (website)/         # Pages publiques (Accueil, Catalogue, Conseils, etc.)
│   │   │   ├── layout.tsx     # Layout principal (Navbar, Footer, SmoothScroll)
│   │   │   └── page.tsx       # Page d'accueil avec composants imbriqués
│   │   ├── api/               # Routes API Next.js (ex: /api/reviews/route.ts)
│   │   ├── studio/            # Point d'entrée de l'interface Sanity
│   │   ├── sitemap.ts         # Générateur dynamique de Sitemap SEO
│   │   └── robots.ts          # Règles d'indexation pour les moteurs de recherche
│   ├── components/            # Composants React réutilisables
│   │   ├── layout/            # Navbar, Footer, WowBackground (fond animé)
│   │   ├── home/              # Sections spécifiques à la page d'accueil
│   │   ├── shared/            # Composants transversaux (CookieBanner, VideoModal)
│   │   └── catalogue/         # Logique d'affichage et filtres du catalogue
│   └── lib/
│       └── sanity/            # Configuration client et requêtes GROQ
├── sanity.config.ts           # Configuration principale de l'espace d'administration
├── sanity/
│   └── schemaTypes/           # Modèles de données (frame, post, video, review)
├── next.config.ts             # Configuration Next.js (Sécurité, redirections, images)
└── package.json               # Dépendances principales (React 19, Next.js 15)
```

## 4. Les technologies utilisées
- **Core :** Next.js 15 (App Router, Server & Client Components), React 19, TypeScript
- **Styling :** Tailwind CSS v4
- **Animations :** Framer Motion, GSAP, Lenis (Smooth Scrolling)
- **CMS Headless :** Sanity v3
- **Formulaires :** React Hook Form avec validation Zod
- **Alertes UI :** React Hot Toast

## 5. Les décisions de design
- **Esthétique "Premium / Luxe" :** Code couleur strict (Noir profond, Blanc, Or/Gold). Typographie moderne et élégante (Inter & Playfair Display).
- **Mise en page des textes :** Textes justifiés, sans lettrines surdimensionnées (choix spécifique de l'utilisateur pour un rendu type "Magazine/Livre").
- **Glassmorphism :** Utilisation massive de fonds semi-transparents avec effet de flou (`backdrop-blur-md`, `bg-black/20`) pour donner de la profondeur.
- **Composants Lourds :** Pour éviter de pénaliser le score Lighthouse, tous les éléments non critiques au premier rendu sont chargés de manière asynchrone.

## 6. Instructions pour un futur modèle IA
1. **Architecture Next.js 15 :** Respectez scrupuleusement la séparation entre composants serveur (par défaut) et composants clients (`"use client"`). N'insérez jamais d'options comme `{ ssr: false }` dans les imports dynamiques appelés depuis un composant Serveur.
2. **Gestion de Sanity :** Ne contournez jamais le CMS. Si une nouvelle donnée textuelle ou visuelle doit être ajoutée de manière pérenne, créez le schéma correspondant dans `sanity/schemaTypes` et requêtez-le via GROQ. Ne supprimez pas le gestionnaire de médias natif.
3. **Sécurité API :** La clé secrète `SANITY_API_TOKEN` ne doit JAMAIS être exposée côté client. Toute action d'écriture (comme les avis) doit obligatoirement passer par un endpoint sécurisé dans `src/app/api/...`.
4. **Maintenabilité :** Gardez le code propre. Utilisez TypeScript de manière stricte (pas de `any` injustifié). Si vous ajoutez de nouvelles pages publiques, assurez-vous de les intégrer au `sitemap.ts`.
5. **Esthétique :** Avant de proposer un composant UI, assurez-vous qu'il respecte les codes du luxe (marges généreuses, polices nettes, transitions fluides via Framer Motion, et pas de couleurs vives hors de la charte).
