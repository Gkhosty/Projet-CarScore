# 🚗 CarScore 

## 📌 Présentation du projet
CarScore  est un site web de scoring automobile développé dans le cadre d'un titre RNCP.
L'objectif est de concevoir un site web innovant permettant aux propriétaires de véhicules d'obtenir une analyse globale et simplifiée de leur voiture grâce à un système de score intelligent.
CarScore  ambitionne de devenir le "Credit Score de la voiture".

---




## 🧱 Stack technique

| Couche | Technologie |
|---|---|
| Frontend | React, TypeScript, CSS3 |
| Backend | Node.js + Express |
| Base de données | Neon (PostgreSQL) |
| Versioning | Git / GitHub |
| Déploiement | Vercel / Render (gratuit) |

---

## ⚙️ Installation

### Prérequis
- [Node.js](https://nodejs.org) v18+
- [pnpm](https://pnpm.io) v8+
- [Git](https://git-scm.com)
- Un compte [Neon](https://neon.tech) pour la base de données


### 2. Installer le frontend

pnpm create vite@latest front -- --template react-ts
pnpm install
```

### 3. Installer le backend

pnpm init
pnpm add express cors dotenv bcrypt jsonwebtoken pg
pnpm add -D nodemon @types/express @types/node @types/bcrypt @types/jsonwebtoken @types/cors


### 5. Lancer le frontend

pnpm run dev
```

Le frontend est accessible sur → **http://localhost:5173**

### 6. Lancer le backend

node index.js
```

Le backend est accessible sur → **http://projet-carscore.onrender.com**

---

## 📁 Structure du projet
```
projet-carscore-rncp/
│
├── front/                          → Frontend React + TypeScript + Vite
│   ├── public/
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
│       │   ├── AddCar.tsx          → Ajouter un véhicule
│       │   ├── CarDetails.tsx      → Détails et score du véhicule
│       │   └── AdminDashboard.tsx  → Tableau de bord admin
│       ├── components/
│       │   ├── Navbar.tsx          → Barre de navigation
│       │   ├── ScoreCard.tsx       → Carte score véhicule
│       │   ├── ScoreBar.tsx        → Barre de progression critères
│       │   └── ProtectedRoute.tsx  → Protection des routes privées
│       ├── utils/
│       │   └── scoring.ts          → Algorithme de scoring (frontend)
│       └── types/
│           └── index.ts            → Types TypeScript
│
└── back/                           → Backend Node.js + Express
    ├── index.js                    → Serveur Express
    ├── .env                        → Variables d'environnement (non versionné)
    ├── .gitignore
    ├── routes/
    │   ├── auth.js                 → POST /register, POST /login
    │   ├── vehicules.js            → GET, POST, DELETE /vehicules
    │   ├── scores.js               → GET, POST /scores
    │   └── admin.js                → Routes administration
    ├── middleware/
    │   └── auth.js                 → Vérification token JWT
    ├── utils/
    │   └── scoring.js              → Algorithme de scoring (backend)
    └── db/
        └── index.js                → Connexion Neon PostgreSQL
```

---

## 📄 Description des pages

1️⃣ **Home** — Présentation du concept CarScore AI  
2️⃣ **Register** — Formulaire de création de compte  
3️⃣ **Login** — Interface de connexion utilisateur  
4️⃣ **Dashboard** — Score global et liste des véhicules enregistrés  
5️⃣ **AddCar** — Formulaire avec tous les critères de scoring :
- Marque / Modèle / Année / Kilométrage
- Type de carburant (essence, diesel, hybride, électrique, gpl)
- Région / Ville
- Carnet d'entretien (complet / partiel / absent)
- Contrôle technique (valide / bientot / depasse)

6️⃣ **CarDetails** — Score détaillé, coût mensuel, dépréciation, recommandation  
7️⃣ **AdminDashboard** — Tableau de bord administration (role = admin)




