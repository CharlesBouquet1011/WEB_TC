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
        const bookings= await Booking.find()
            .populate("voitureReservee")
            .populate("user")
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

//un admin ajoute une résa
router.post("/addAdmin", csrfProtection,limiter, async (req,res)=>{
    try {
        const { voitureReservee, user, dateDebut, dateFin } = req.body;
        const newBooking = new Booking({
          dateDebut: new Date(dateDebut),
          dateFin: new Date(dateFin),
          user: user,
          voitureReservee: voitureReservee,
          validated: true,
        });
       await newBooking.save();
       res.status(200).json({message: "Location ajoutée"})

    } catch (err) {
        res.status(500).json({erreur: "Erreur serveur"})
        console.log("Erreur: ",err)
    }
})

router.post("/check-disponibilite", csrfProtection, async (req, res) => {
    try {
        const { dateDebut, dateFin, voitureReservee } = req.body;
        const bookings = await Booking.find({
            voitureReservee,
                dateDebut: { $lt: new Date(dateFin) },
                dateFin: { $gt: new Date(dateDebut) }
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

router.post("/validate-user-bookings", auth, async (req, res) => {
    try {
      const userId = req.user._id;
      const { options } = req.body; // Récupérer les options depuis la requête
  
      // Trouve les réservations non validées de cet utilisateur
      const bookings = await Booking.find({ utilisateur: userId, validated: false });
      var modifiedCount=0
      for (const booking of bookings){
        modifiedCount=modifiedCount+1
        booking.validated=true
        if (options && options.length > 0) {
            booking.options = options;
          }
        await booking.save()
      }
      
  
      return res.status(200).json({
        message: "Réservations validées",
        modifiedCount: modifiedCount,
      });
    } catch (error) {
      console.error("Erreur de validation des bookings :", error);
      return res.status(500).json({ error: "Erreur serveur" });
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


router.get("/seeConfirmed",csrfProtection,auth,async(req,res)=>{
    try{
        const {userId}=req.user
        const bookings= await Booking.find({user:userId,validated:true}).populate("voitureReservee")
        res.status(200).json({bookings:bookings})
    }catch(err){
        console.log("Erreur lors du retrait des bookings: ",err)
        res.status(500).json({erreur: "Erreur serveur"})
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

router.get("/unconfirmed",csrfProtection,auth,limiter, async (req,res)=>{
    try {
        const {userId} = req.user //on peut prendre userId parce qu'on l'a mis dans le login avec jwt
        const bookings= await Booking.find({user: userId, validated: false}).populate("voitureReservee")
        res.status(200).json({bookings: bookings})
        }
    catch (err){
        res.status(500)
        console.log("Erreur: ",err)
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
                const booking=Booking.findById(idBooking)
                //calculer le prix et rembourser en plus, on n'a pas besoin de s'en occuper ici n'ayant pas de plateforme de paiement


                if (booking.user!=userId){
                    res.status(403).json({erreur:"Vous n'êtes pas le propriétaire de la réservation"})
                }
                else{
                    const deletedBooking=await Booking.findByIdAndDelete( idBooking  ) //suppression de l'utilisateur
                    res.status(200).json({message:"Réservation supprimée"})
                }
            }

        }else {
            if (typeof idBooking !=="string"){
                res.status(400).json({erreur: "Id Invalide"})
            }
             //calculer le prix et rembourser aussi   
                const deletedBooking=await Booking.findByIdAndDelete(idBooking ) //suppression de l'utilisateur
                console.log("Réservation supprimée")
                res.status(200).json({message: "Réservation supprimée"})
            
        }
    }catch (err){
            res.status(500)
            console.log("Erreur: ", err)
        }
    
})

router.delete("/deleteAdmin/:id",csrfProtection,limiter, async (req,res) => {
    try {
        console.log("Tentative de suppression de la réservation");
        const { id }=req.params;
        console.log("Booking id:", id);

        //calculer le prix et rembourser en plus, on n'a pas besoin de s'en occuper ici n'ayant pas de plateforme de paiement

        const deletedBooking=await Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
            return res.status(404).json({message: "Location non trouvée"});
        }
        console.log("Réservation supprimée:", deletedBooking);
        res.status(200).json({message:"Réservation supprimée avec succès"});
            
    } catch (err){
            res.status(500).json({erreur: "Erreur serveur"});
            console.log("Erreur: ", err);
        }  
})

module.exports=router