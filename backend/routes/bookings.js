const express = require("express");
const router = express.Router();
const csrfProtection=require("../config/csrf.js");
var Math = require('mathjs');

const User = require("../models/UserModel.js");
const limiter = require("../config/rateLimiter.js");
const bcrypt = require("bcrypt");
require('dotenv').config();
//const auth=require("../config/authenticator.js")
const Booking=require("../models/BookingModel.js")

const auth=require("../config/authenticator.js")

//récupérer tous les bookings 
router.get("/seeAll",csrfProtection, limiter, async (req,res)=>{ 
    try {
        const bookings= await Booking.find().populate("voitureReservee")
        res.status(200).json({bookings: bookings})
        }
    catch (err){
        res.status(500)
        console.log("Erreur: ",err)
    }

})

//un utilisateur ajoute une résa
router.post("/add", csrfProtection,limiter, auth, async (req,res)=>{
    try {
        const { dateDebut, dateFin, voitureReservee } = req.body;
        const { userId } = req.user;
        const newBooking = new Booking({
          dateDebut: new Date(dateDebut), // s'assurer que c'est bien un Date
          dateFin: new Date(dateFin),
          voitureReservee: voitureReservee,
          user: userId,
          validated: false,
        });
       await newBooking.save();
       console.log("Location ajoutée: ", newBooking )
       res.status(200).json({message: "Location ajoutée"})

    } catch (err) {
        res.status(500).json({erreur: "Erreur serveur"})
        console.log("Erreur: ",err)
    }
})

router.post("/check-disponibilite", csrfProtection, auth, async (req, res) => {
    try {
        const { dateDebut, dateFin, voitureReservee } = req.body;
        const bookings = await Booking.find({
            voitureReservee,
            $or: [
                { dateDebut: { $lt: new Date(dateFin) } },
                { dateFin: { $gt: new Date(dateDebut) } }
            ]
        });
        if (bookings.length > 0) {
            return res.status(200).json({ disponible: false });
        }
        return res.status(200).json({ disponible: true });
    } catch (err) {
        console.error("Erreur lors de la vérification de la disponibilité:", err);
        return res.status(500).json({ erreur: "Erreur serveur" });
    }
});

router.get("/infos",csrfProtection,async(req,res)=>{
    try{
        var mail= process.env.mail
        var phoneNumber=process.env.phoneNumber
        res.status(200).json({mail:mail,phoneNumber:phoneNumber})
    } catch (err){
        console.log("Erreur envoi mail + num tel",err)
        res.status(500).json({erreur:"Erreur serveur"})
    }
    
    
})


router.get("/see",csrfProtection,auth,limiter, async (req,res)=>{
    try {
        const {userId} = req.user //on peut prendre userId parce qu'on l'a mis dans le login avec jwt
        const bookings= await Booking.find({user: userId}).populate("voitureReservee")
        res.status(200).json({bookings: bookings})
        }
    catch (err){
        res.status(500)
        console.log("Erreur: ",err)
    }

})

router.post("/modify",csrfProtection,auth,limiter,async(req,res)=>{
    const {userId}=req.user
    var {idBooking,nvDateDebut,nvDateFin,idnvVoitureReservee}=req.body
    
    
    
    
    if (typeof idBooking !=="string"){
        res.status(400).json({erreur: "Id Invalide"})
        return ;
    }
    const concernedBooking=await Booking.findById({_id:{$eq:idBooking}})
    if (!concernedBooking.validated){
        res.status(200).json({message:"Veuillez d'abord payer votre Réservation ou l'annuler"})
        return ;
    }
    
    if (concernedBooking.user!=userId){
        res.status(403).json({erreur:"Permission incorrect"})
        return ;
    }

    //gestion de s'il laisse les champs vides
    if (!nvDateDebut){
        nvDateDebut=concernedBooking.dateDebut
    }
    if (!nvDateFin){
        nvDateFin=concernedBooking.dateFin
    }
    if (!idnvVoitureReservee){
        idnvVoitureReservee=concernedBooking.voitureReservee
    }


    const ancienneDuree=Math.ceil((Booking.dateDebut-Booking.dateFin)/(1000*60*60*24))
    const nvlleDuree=Math.ceil((nvDateFin-nvDateDebut)/(1000*24*60*60))
    
    if ( nvlleDuree!= ancienneDuree ||idnvVoitureReservee!=concernedBooking.voitureReservee){
        var ancienPrix=0//il faudrait recalculer l'ancien prix ou l'avoir stocké
        rembourse(ancienPrix)
        var prix=0 //il faudrait calculer le prix en fonction de la voiture vraiseblablement
        faitPayer(prix)
    }
    const session = await mongoose.startSession(); // Démarre une session
    session.startTransaction();
    try{
        concernedBooking.dateDebut=nvDateDebut
        concernedBooking.dateFin=nvDateFin
        concernedBooking.voitureReservee=idnvVoitureReservee
        await concernedBooking.save({ session }); 

    await session.commitTransaction(); 
    session.endSession();
    res.status(200).json({message:"Modification réussie"})
    } catch (err){
        console.log("Erreur lors du changement de la réservation :", err)
        await session.abortTransaction(); // Annule la transaction en cas d'erreur
        session.endSession();
        res.status(500).json({erreur:"Erreur serveur"})
    }
    
    

})
//il faudrait rembourser mais pour l'instant on n'a pas de façon de payer
function rembourse(){

}
function calculeRemboursement(){

}
//pour le coup il faudrait remplir cette fonction là, on peut le faire
function calculePaiement(){

}
//il faudrait faire payer le prix indiqué
function faitPayer(prix){

}


router.delete("/delete",csrfProtection,auth,limiter, async (req,res)=>{
    try{
        const {userId}=req.body
        const user=User.findById(userId)
        const {idBooking}=req.body
        
        if (!user.admin){//si ce n'est pas un utilisateur admin
            if (typeof idBooking !=="string"){
                res.status(400).json({erreur: "Id Invalide"})
            }else{
                const booking=Booking.findById({_id:{$eq:idBooking}})
                //calculer le prix et rembourser en plus, on n'a pas besoin de s'en occuper ici n'ayant pas de plateforme de paiement


                if (booking.user!=userId){
                    res.status(403).json({erreur:"Vous n'êtes pas le propriétaire de la réservation"})
                }
                else{
                    const deletedBooking=await Booking.findByIdAndDelete({ _id: { $eq: idBooking } }) //suppression de l'utilisateur
                    res.status(200).json({message:"Réservation supprimée"})
                }
            }

        }else {
            if (typeof idBooking !=="string"){
                res.status(400).json({erreur: "Id Invalide"})
            }
             //calculer le prix et rembourser aussi   
                const deletedBooking=await Booking.findByIdAndDelete({ _id: { $eq: idBooking } }) //suppression de l'utilisateur
                console.log("Réservation supprimée")
                res.status(200).json({message: "Réservation supprimée"})
            
        }
    }catch (err){
            res.status(500)
            console.log("Erreur: ", err)
        }
    
})

module.exports=router