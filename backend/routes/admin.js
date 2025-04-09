const express = require("express");
const router = express.Router();
const csrfProtection=require("../config/csrf.js");
const limiter = require("../config/rateLimiter.js");
require('dotenv').config();

const session = require("express-session");

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "1234"; // Mot de passe d'accès
router.post("/login", csrfProtection, limiter, async (req,res)=>{
  try {
    if (req.body.password === ADMIN_PASSWORD) {
      console.log("Connexion admin")
      res.status(200).json({ success: true });
    } else {
      console.log("Erreur connexion admin")
      res.json({ success: false, message: "Mot de passe incorrect" });
    }
  } catch (err) {
    res.status(500).json({erreur: "Erreur serveur"})
    console.log("Erreur: ",err)
  }
})

module.exports=router