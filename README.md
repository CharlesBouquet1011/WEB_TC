# Projet web

Ce projet est un site web qui permet de louer des voitures de luxe
## fonctions prises en charge:
- création de compte
- ajout dynamique de voitures
- création d'emprunts
- une interface moderne et luxueuse



# lancer le projet:

- installer Docker
- faire `docker compose up -d`
- allez sur localhost 

# dependances:

## 📦 Dépendances

### Backend (`/back`)

**Production :**
- [`bcrypt`](https://www.npmjs.com/package/bcrypt) — Hachage de mots de passe
- [`cookie-parser`](https://www.npmjs.com/package/cookie-parser) — Parsing des cookies
- [`cors`](https://www.npmjs.com/package/cors) — Gestion des requêtes CORS
- [`csurf`](https://www.npmjs.com/package/csurf) — Middleware de protection CSRF
- [`dotenv`](https://www.npmjs.com/package/dotenv) — Chargement des variables d’environnement
- [`express`](https://www.npmjs.com/package/express) — Framework web minimaliste
- [`express-rate-limit`](https://www.npmjs.com/package/express-rate-limit) — Limitation du nombre de requêtes
- [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) — Authentification par JWT
- [`mathjs`](https://www.npmjs.com/package/mathjs) — Bibliothèque mathématique complète
- [`mongoose`](https://www.npmjs.com/package/mongoose) — ODM pour MongoDB

**Développement :**
- [`nodemon`](https://www.npmjs.com/package/nodemon) — Redémarrage automatique en dev

---

### Frontend (`/frontend`)

**Production :**
- [`react`](https://www.npmjs.com/package/react) — Bibliothèque principale
- [`react-dom`](https://www.npmjs.com/package/react-dom) — Intégration React au DOM
- [`react-router-dom`](https://www.npmjs.com/package/react-router-dom) — Routing côté client
- [`react-modal`](https://www.npmjs.com/package/react-modal) — Fenêtres modales accessibles
- [`framer-motion`](https://www.npmjs.com/package/framer-motion) — Animations fluides et dynamiques
- [`react-intersection-observer`](https://www.npmjs.com/package/react-intersection-observer) — Détection de la visibilité des éléments
- [`react-datepicker`](https://www.npmjs.com/package/react-datepicker) — Sélecteur de date
- [`web-vitals`](https://www.npmjs.com/package/web-vitals) — Mesures de performance

**Tests :**
- [`@testing-library/react`](https://www.npmjs.com/package/@testing-library/react)
- [`@testing-library/jest-dom`](https://www.npmjs.com/package/@testing-library/jest-dom)
- [`@testing-library/dom`](https://www.npmjs.com/package/@testing-library/dom)
- [`@testing-library/user-event`](https://www.npmjs.com/package/@testing-library/user-event)

---
