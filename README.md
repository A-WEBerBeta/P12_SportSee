SportSee – Tableau de bord utilisateur

Application React (Vite) affichant l’activité, les sessions moyennes, les performances et le score d’un utilisateur.
Les données proviennent au choix des mocks locaux ou de l’API http://localhost:3000.

🚀 Démarrage rapide
Backend (API locale)
cd backend
yarn # installe les dépendances
yarn dev # lance l’API en dev sur http://localhost:3000

Frontend
cd frontend
npm install
npm run dev # démarre Vite (par défaut : http://localhost:5173)

Par défaut, l’app lit l’utilisateur indiqué par la variable d’environnement VITE_USER_ID (voir plus bas).

⚙️ Configuration des variables d’environnement globales

Ce projet est en mode développement. Le fichier .env contient les variables permettant de simuler des cas d’utilisation figés.

VITE_IS_PROD (bool) : indique si les données sont mockées (false) ou récupérées depuis le backend (true).

VITE_USER_ID (number) : identifiant de l’utilisateur à afficher (12 ou 18).

Exemples de .env
Mode mocks (recommandé pour tester rapidement)
VITE_IS_PROD=false
VITE_USER_ID=12

Mode API locale
VITE_IS_PROD=true
VITE_USER_ID=18

API attendue sur http://localhost:3000
Endpoints utilisés : GET /user/:id · GET /user/:id/activity · GET /user/:id/average-sessions · GET /user/:id/performance

🧩 Scripts utiles (frontend)
npm run dev # serveur de dev Vite
npm run build # build de production (génère ./dist)
npm run preview # prévisualiser le build (sert ./dist)

npm run build concerne uniquement le front. Le backend se lance en dev avec yarn dev.

🗂️ Structure (aperçu)
src/
components/ # Recharts\* + StatCard + tooltips/cursor
pages/ # Dashboard.jsx (page principale)
services/ # Accès données + formatters (API/mocks)
mocks/ # Données locales (dev)
utils/ # makeStatItems (cartes stats)

📌 Notes

Les services basculent automatiquement entre mocks et API via VITE_IS_PROD.

La page Dashboard lit l’ID depuis VITE_USER_ID et propage userId aux graphiques.

Utilisation PropTypes pour vérifier les props pendant le développement, et JSDoc pour documenter les composants et services dans l'éditeur.
