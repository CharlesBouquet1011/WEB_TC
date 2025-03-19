const express = require("express");
const router = express.Router();
const csrfProtection=require("../config/csrf");
const mongoose = require("../config/mongo.js"); //peut-être optionnel
const User = require("../models/UserModel.js");
const limiter = require("../config/rateLimiter.js");
const bcrypt = require("bcrypt");
// génération jetons csrf
router.get("/csrf-token",csrfProtection, async (req,res) => {
    try{
        res.json({csrfToken: req.csrfToken()});
    } catch (err) {
        console.log("erreur: ", err)
        res.status(500).json({error: "erreur serveur"}) //pour pas qu'un attaquant récupère l'erreur
    }
})
//inscription des utilisateurs
router.post("/registration", csrfProtection, limiter, async (req,res)=>{
    try {
        const { Name, FirstName, email, PhoneNumber, Password } = req.body;
        console.log("body", req.body)
        console.log("nom ", Name)
        console.log("mot de passe", Password)
        const hashedPassword=await hashString(Password)
        console.log(hashedPassword)
        const newUser = new User({
            name: Name + FirstName,
            phoneNumber: PhoneNumber,
            email: email,
            password: hashedPassword, // Pense à hasher le mot de passe en prod
          });
      
          await newUser.save();
        console.log("utilisateur enregistré: " , newUser )
        res.status(200).json({ok: "requête reçue"})
    }
    catch (err){
        console.log("erreur: ",err)
        res.status(500).json({error: "erreur serveur"})
        

    }
})
//renvoie un hash du string en sortie
async function hashString(string){
    const salt = await bcrypt.genSalt(10) //on génère un sel aléatoire pour hash le password, l'algo de hashage est déterministe
    //donc ça permet de le rentre moins prévisible
    console.log("sel ", salt)
    return await bcrypt.hash(string,salt) //on hash le string avec l'algo bcrpyt avec le sel salt

}

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