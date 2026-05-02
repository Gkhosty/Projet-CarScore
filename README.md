# 🚗 CarScore

## 📌 Présentation du projet

CarScore est un site web de scoring automobile développé dans le cadre d'un titre RNCP.
L'objectif est de concevoir un site web innovant permettant aux propriétaires de véhicules d'obtenir une analyse globale et simplifiée de leur voiture grâce à un système de score intelligent.

CarScore ambitionne de devenir le **"Credit Score de la voiture"** : un score unique sur 100 qui résume l'état global d'un véhicule et donne une recommandation claire : **garder ou vendre ?**

---

## 🌐 Déploiement

| Environnement | URL |
|---|---|
| Frontend | https://car-score-alpha.vercel.app |
| Backend | https://projet-carscore.onrender.com |
| Base de données | Neon PostgreSQL (cloud) |

---

## 🧱 Stack technique

| Couche | Technologie |
|---|---|
| Frontend | React, TypeScript, CSS3 |
| Backend | Node.js + Express |
| Base de données | Neon (PostgreSQL) |
| Validation | Zod (backend + frontend) |
| API externe | NHTSA (autocomplétion marque et modèle) |
| Versioning | Git / GitHub |
| Déploiement | Vercel (frontend) + Render (backend) |
| Tests frontend | Vitest |
| Tests backend | Jest |
| CI/CD | GitHub Actions |

---

## ⚙️ Installation

### Prérequis
- [Node.js](https://nodejs.org) v20+
- [pnpm](https://pnpm.io) v8+
- [Git](https://git-scm.com)
- Un compte [Neon](https://neon.tech) pour la base de données

### 1. Cloner le projet

```bash
git clone https://github.com/Gkhosty/Projet-CarScore
cd Projet-CarScore
```

### 2. Installer le frontend

```bash
cd Front
pnpm install
```

### 3. Installer le backend

```bash
cd Back
pnpm install
```

### 4. Configurer les variables d'environnement

Crée un fichier `.env` dans le dossier `Back/` :

```
DATABASE_URL=ta_url_neon
JWT_SECRET=ta_cle_secrete
EMAIL_USER=ton_email
EMAIL_PASS=ton_mot_de_passe_app
PORT=5000
```

### 5. Lancer le frontend

```bash
cd Front
pnpm run dev
```

Le frontend est accessible sur → **http://localhost:5173**

### 6. Lancer le backend

```bash
cd Back
node index.js
```

Le backend est accessible sur → **http://localhost:5000**

### 7. Migrations — Créer les tables dans Neon

Exécute les fichiers SQL dans cet ordre dans Neon :

```
Back/migrations/001_create_users.sql
Back/migrations/002_create_vehicules.sql
Back/migrations/003_create_scores.sql
```

---

## 📁 Structure du projet

```
Projet-CarScore/
│
├── .github/
│   └── workflows/
│       └── ci.yml                  → CI/CD GitHub Actions
│
├── Front/                          → Frontend React + TypeScript + Vite
│   ├── public/
│   ├── vercel.json                 → Configuration React Router pour Vercel
│   ├── index.html
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx                 → Composant principal + routing
│       ├── main.tsx                → Point d'entrée React
│       ├── index.css               → Styles globaux + charte graphique
│       ├── pages/
│       │   ├── Home.tsx            → Page d'accueil
│       │   ├── Register.tsx        → Inscription
│       │   ├── Login.tsx           → Connexion
│       │   ├── Dashboard.tsx       → Tableau de bord
│       │   ├── AddCar.tsx          → Ajouter un véhicule (autocomplétion NHTSA)
│       │   ├── CarDetails.tsx      → Détails et score du véhicule
│       │   ├── ForgotPassword.tsx  → Mot de passe oublié
│       │   ├── ResetPassword.tsx   → Réinitialisation mot de passe
│       │   ├── Verify.tsx          → Validation email
│       │   └── AdminDashboard.tsx  → Tableau de bord admin
│       ├── components/
│       │   ├── Header.tsx          → Navigation avec menu hamburger mobile
│       │   ├── Footer.tsx          → Pied de page avec sources et réseaux sociaux
│       │   ├── ScoreCard.tsx       → Carte score véhicule
│       │   ├── ScoreBar.tsx        → Barre de progression critères
│       │   └── ProtectedRoute.tsx  → Protection des routes privées
│       ├── utils/
│       │   ├── scoring.ts          → Algorithme de scoring (frontend)
│       │   └── validators.ts       → Schémas de validation Zod (frontend)
│       ├── tests/
│       │   └── scoring.test.ts     → Tests Vitest
│       └── types/
│           └── index.ts            → Types TypeScript
│
└── Back/                           → Backend Node.js + Express
    ├── index.js                    → Serveur Express + middleware erreurs
    ├── .env                        → Variables d'environnement (non versionné)
    ├── .gitignore
    ├── migrations/
    │   ├── 001_create_users.sql    → Création table users
    │   ├── 002_create_vehicules.sql → Création table vehicules
    │   └── 003_create_scores.sql   → Création table scores
    ├── routes/
    │   ├── auth.js                 → POST /register, POST /login, GET /verify
    │   ├── vehicules.js            → GET, POST, DELETE /vehicules
    │   ├── scores.js               → GET, POST /scores
    │   └── admin.js                → Routes administration
    ├── middleware/
    │   └── auth.js                 → Vérification token JWT
    ├── utils/
    │   ├── scoring.js              → Algorithme de scoring (backend)
    │   ├── validators.js           → Schémas de validation Zod (backend)
    │   ├── handler.js              → asyncHandler + middlewareErreurs
    │   └── email.js                → Envoi emails (validation + reset)
    └── tests/
        └── scoring.test.js         → Tests Jest
```

---

## 📄 Description des pages

1️⃣ **Home** — Présentation du concept CarScore
2️⃣ **Register** — Formulaire de création de compte
3️⃣ **Login** — Interface de connexion utilisateur
4️⃣ **Dashboard** — Score global et liste des véhicules enregistrés
5️⃣ **AddCar** — Formulaire avec tous les critères de scoring :
- Marque / Modèle (autocomplétion via API NHTSA) / Année / Kilométrage
- Type de carburant (essence, diesel, hybride, électrique, gpl)
- Région / Ville
- Carnet d'entretien (complet / partiel / absent)
- Contrôle technique (valide / bientot / depasse)

6️⃣ **CarDetails** — Score détaillé, coût mensuel, dépréciation, recommandation
7️⃣ **AdminDashboard** — Tableau de bord administration (role = admin)
8️⃣ **ForgotPassword** — Demande de réinitialisation du mot de passe
9️⃣ **ResetPassword** — Formulaire de nouveau mot de passe
🔟 **Verify** — Validation du compte par email

---

## 📊 Logique de scoring — 6 critères

| Critère | Impact | Pondération |
|---|---|---|
| Kilométrage | Très élevé | sur 20 |
| Année du véhicule | Élevé | sur 20 |
| Type de carburant | Moyen | sur 15 |
| Région | Moyen | sur 15 |
| Carnet d'entretien | Moyen | sur 10 |
| Contrôle technique | Moyen | sur 10 (5 + bonus 5) |

| Score | Recommandation |
|---|---|
| 80 — 100 | Garder — votre voiture a encore beaucoup de valeur |
| 60 — 79 | Garder encore 1 à 2 ans |
| 40 — 59 | Envisager la revente dans les 6 mois |
| 0 — 39 | Vendre rapidement avant de perdre encore plus de valeur |

---

## 🔐 Sécurité

- Mots de passe hashés avec **bcrypt** (minimum 12 caractères)
- Authentification par **tokens JWT** (24h)
- Routes protégées via **middleware verifierToken**
- Validation des inputs avec **Zod** côté serveur ET côté client
- Limite de **5 véhicules** par utilisateur (backend + frontend)
- **Requêtes paramétrées** contre l'injection SQL
- Variables sensibles dans `.env` (jamais dans le code source)
- Gestion d'erreurs centralisée via **asyncHandler + middlewareErreurs**

---

## 🗄️ Migrations

Les évolutions du schéma sont gérées via des fichiers SQL numérotés :

```
001_create_users.sql     → Table users (id, nom, email, password, role, verifie)
002_create_vehicules.sql → Table vehicules (FK → users, ON DELETE CASCADE)
003_create_scores.sql    → Table scores (FK → vehicules, ON DELETE CASCADE)
```

---

## 🧪 Tests

### Frontend — Vitest

```bash
cd Front
pnpm test
```

### Backend — Jest

```bash
cd Back
pnpm test
```

### CI/CD — GitHub Actions

À chaque push sur `main` :
1. Les tests backend (Jest) se lancent automatiquement
2. Les tests frontend (Vitest) se lancent automatiquement
3. Si tous les tests passent → déploiement automatique sur Render

---

## 🚀 API REST — Routes

| Méthode | Route | Description | Auth |
|---|---|---|---|
| POST | /api/register | Inscription utilisateur | ❌ |
| POST | /api/login | Connexion + token JWT | ❌ |
| GET | /api/verify/:token | Validation email | ❌ |
| POST | /api/forgot-password | Demande reset mot de passe | ❌ |
| POST | /api/reset-password/:token | Réinitialiser mot de passe | ❌ |
| GET | /api/vehicules | Récupérer les véhicules | ✅ JWT |
| POST | /api/vehicules | Ajouter un véhicule | ✅ JWT |
| DELETE | /api/vehicules/:id | Supprimer un véhicule | ✅ JWT |
| POST | /api/scores | Calculer et sauvegarder le score | ✅ JWT |
| GET | /api/scores/:vehiculeId | Récupérer le score | ✅ JWT |
| GET | /api/admin/stats | Statistiques globales | ✅ Admin |
| GET | /api/admin/users | Liste des utilisateurs | ✅ Admin |
| PUT | /api/admin/users/:id | Désactiver un utilisateur | ✅ Admin |
| DELETE | /api/admin/users/:id | Supprimer un utilisateur | ✅ Admin |
| GET | /api/admin/analyses | Analyses récentes | ✅ Admin |

---

## 👨‍💻 Réalisation

Projet développé en solo par Gulbaddin KHOSTY dans le cadre d'un titre RNCP.
