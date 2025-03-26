const express = require("express");
const router = express.Router();
const csrfProtection=require("../config/csrf");

const User = require("../models/UserModel.js");
const limiter = require("../config/rateLimiter.js");
const bcrypt = require("bcrypt");
const mongoose=require("../config/mongo.js")
require('dotenv').config();
const jwt = require("jsonwebtoken"); //pour l'authentification (javascript web token)
const auth = require("../config/authenticator.js");
const Booking = require("../models/BookingModel.js");
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
        
        const existe= await User.exists().where("email").equals(email) //on vérifie qu'il n'y a pas de doublon de mail
        if (existe){
            res.status(500).json({error: "adresse mail déjà utilisée"}) //au cas où quelqu'un arrive à donner un mail non autorisé
            return ;
        } 

        const hashedPassword=await hashString(Password)
        
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
    try{
        const salt = await bcrypt.genSalt(10) //on génère un sel aléatoire pour hash le password, l'algo de hashage est déterministe
        //donc ça permet de le rentre moins prévisible
        console.log("sel ", salt)
        return await bcrypt.hash(string,salt) //on hash le string avec l'algo bcrpyt avec le sel salt
    } catch (err){
        console.log("Erreur lors de la création du hash", err)
        
    }
    

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
        res.status(500).json({error: "Erreur serveur"})
        console.log("Erreur serveur" + err)
    }



})

//login
router.post("/login",csrfProtection,limiter, async (req,res) =>{
    //rajouter quelque part un truc pour un mot de passe oublié
    try{
        const {Email, Password} = req.body  
        const user =await  User.findOne({email: { $eq: Email } })//pour la sécurité
        if (user){
            console.log(user)
            
           const hashedPassword=user.password
            
            match= await bcrypt.compare(Password,hashedPassword)
            if (match){

                const token = jwt.sign(
                    { userId: user._id, email: user.email }, // Payload
                    process.env.JWT_SECRET, // Clé secrète
                    { expiresIn: "2h" } // Expiration du token
                );

                res.cookie("authToken", token, {
                    httpOnly: true,  // cookie HttpOnly, empêche certaines attaques info
                    secure: process.env.PROD, // Active secure uniquement en prod pour l'https
                    sameSite: "strict", // protection csrf 
                    maxAge: 2 * 60 * 60 * 1000, // le cookie expire dans 2h
                });
                res.json({message: "Connexion réussie"})
                console.log("login réussi")



            }
            else {
                console.log("mot de passe invalide")
                res.status(401).json({error: "Mot de passe ou email incorrect" })
                return ;
            }
        }
        else{
            console.log("email invalide")
            res.status(401).json({error: "Mot de passe ou email incorrect" })
            return ;
        }
    }catch (err){
        console.log("Erreur lors du login :",err)
        res.status(500).json({erreur: "Erreur serveur"})
    }
        
        


})
router.get("/logged",csrfProtection,limiter,auth,(req,res)=>{
    res.status(200).json({logged:"oui"})
})

router.post("/logout",csrfProtection,limiter, (req,res) => {
    try{
        res.clearCookie("authToken",{
            httpOnly:true,
            secure:process.env.PROD,
            sameSite:"strict"
        })
        res.status(200).json({message: "déconnexion réussie"})
    } catch (err){
        console.log("Erreur lors de la déconnexion :", err)
        res.status(500).json({erreur: "Erreur Serveur"})
    }
    

})

router.delete("/deleteAccount",csrfProtection,limiter,auth, async(req,res)=>{
    //il faut supprimer toutes leurs réservations également
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
    console.log("Essai de supprimer le compte")
    const {userId}=req.user
    console.log("ID: ",userId)
    await Booking.deleteMany({user:userId}) //suppression des réservations
    
    const deletedUser=await User.findByIdAndDelete(userId) //suppression de l'utilisateur
    console.log("Utilisateur trouvé: ", deletedUser)
    // Commit the transaction if all operations succeed
    await session.commitTransaction();
    console.log("Compte supprimé")
    // End the session
    session.endSession();
    res.clearCookie("authToken",{
        httpOnly:true,
        secure:process.env.PROD,
        sameSite:"strict"
    })
    res.status(200).json({message: "suppression réussie"})
    } catch (err){
        await session.abortTransaction();
        session.endSession();
        console.log("Erreur lors de la suppression :", err)
        res.status(500).json({erreur: "Erreur serveur"})
    }

})

module.exports = router;