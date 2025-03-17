const express = require("express");
const router = express.Router();
const csrfProtection=require("../config/csrf");
const mongoose = require("../config/mongo.js");
const User = require("../models/UserModel.js");
const limiter = require("../config/rateLimiter.js");

// génération jetons csrf
router.get("/csrf-token",csrfProtection, async (req,res) => {
    try{
        res.json({csrfToken: req.csrfToken()});
    } catch (err) {
        res.status(500).json({error: err})
    }
})
//inscription des utilisateurs
router.post("/registration", csrfProtection, limiter, async (req,res)=>{
    try {
        const { name, firstName, email, phone, password } = req.body;
        res.status(200).json({ok: "requête reçue"})
    }
    catch (err){

    }
})
//vérifie que le mail de l'utilisateur qui s'inscrit n'est pas déjà utilisé
router.post("/mail-check",csrfProtection, limiter, async (req,res)=> {
    const {email} = req.body;

    try{
        
        const existe= await User.exists().where("email").equals(email)
        res.setHeader("Content-Type", "application/json");
        if (existe){
            
            return res.status(200).json({dispo: "non dispo"})
        }
        else {
            return res.status(200).json({dispo: "dispo"})
        }

    } catch (err) {
        res.status(500).json({message: "Erreur serveur"})
        console.log("Erreur serveur" + err)
    }



})

module.exports = router;