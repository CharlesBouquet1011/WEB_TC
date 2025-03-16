const express = require("express");
const router = express.Router();
const csrfProtection=require("../config/csrf");
const mongoose = require("../config/mongo.js");
const User = require("../models/UserModel.js");
// Exemple de route
router.get("/csrf-token",csrfProtection, async (req,res) => {
    try{
        res.json({csrfToken: req.csrfToken()});
    } catch (err) {
        res.status(500).json({error: err})
    }
})

router.post("/registration", csrfProtection, async (req,res)=>{
    try {
        const { name, firstName, email, phone, password } = req.body;
        res.status(200).json({ok: "requête reçue"})
    }
    catch (err){

    }
})

router.post("/mail-check",csrfProtection,async (req,res)=> {
    const {email} = req.body;

    try{
        const existe= await User.exists({email})
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