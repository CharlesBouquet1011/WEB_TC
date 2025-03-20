const jwt = require("jsonwebtoken");

function auth(req, res, next) { //authentification
    const token = req.cookies.authToken; //on récupère le cookie enregistré comme authToken

    if (!token) {
        return res.status(401).json({ error: "Non autorisé" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // On attache l'utilisateur à 'req.user' cela correspond à l'utilisateur qui a envoyé la requête
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token invalide" });
    }
}

module.exports = auth; //pour s'authentifier utiliser ce middlewaire
