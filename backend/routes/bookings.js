const express = require("express");
const router = express.Router();
const csrfProtection=require("../config/csrf.js");

const User = require("../models/UserModel.js");
const limiter = require("../config/rateLimiter.js");
const bcrypt = require("bcrypt");
require('dotenv').config();
//const auth=require("../config/authenticator.js")
const Booking=require("../models/BookingModel.js")

const auth=require("../config/authenticator.js")

//récupérer tous bookings d'un utilisateur
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
router.post("/add", csrfProtection,auth,limiter, async (req,res)=>{
    try {
       const newBooking = new Booking (req.body);
       const {userId} = req.user
       await newBooking.save();
        console.log("Location ajoutée: ", newBooking )
        res.status(200).json({message: "Location ajoutée"})

    } catch (err) {
        res.status(500).json({erreur: "Erreur serveur"})
        console.log("Erreur: ",err)
    }
})

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


router.delete("/delete",csrfProtection,limiter,async (req,res) => {
    try{
        const {idBooking} = req.body
        if (typeof idBooking !=="string"){
            res.status(400).json({erreur: "Id Invalide"})
        }
        const deletedBooking=await Booking.findByIdAndDelete({ _id: { $eq: idBooking } }) //suppression de l'utilisateur
        console.log("Réservation supprimée")
        res.status(200).json({message: "Réservation supprimée"})
    }catch (err){
        res.status(500)
        console.log("Erreur: ", err)
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

module.exports=router