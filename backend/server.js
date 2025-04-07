require('dotenv').config();
const express = require('express');

const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(express.json())
//protection csrf
const csrfProtection= require("./config/csrf.js");

//connexion moogose:
const mongoose= require("./config/mongo.js")
const PORT = 80;

//importations routes
const securityRoute= require("./routes/security.js");
const bookingsRoute = require("./routes/bookings.js")
const carRoute= require("./routes/cars.js")
const assistanceRoute= require("./routes/assistance.js")
//autoriser les proxies pour pouvoir bien suivre et appliquer le rate-limiter:
app.set('trust proxy',1)
//utilisation des routes
app.use("/security",securityRoute);
app.use("/bookings",bookingsRoute);
app.use("/cars",carRoute);
app.use("/assistance",assistanceRoute);
const rate_limiter= require("./config/rateLimiter.js")

// Définition d'un modèle simple
const Test = mongoose.model('Test', new mongoose.Schema({
    name: String
}));
//attention les routes sont toutes sans le /api parce que le serveur nginx le supprime (pour économiser un /api par definition de fonction)
// Route pour récupérer les items
app.get('/test', rate_limiter, async (req, res) => {
    try {
        const items = await Test.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur'+ err });
    }
});
//génération token csrf, le demander à chaque requête POST/PUT/DELETE (GET on s'en fout)


// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
