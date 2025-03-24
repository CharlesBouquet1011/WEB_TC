const express = require("express");
const router = express.Router();
const csrfProtection=require("../config/csrf");

const User = require("../models/UserModel.js");
const limiter = require("../config/rateLimiter.js");
const bcrypt = require("bcrypt");
require('dotenv').config();
const auth=require("../config/authenticator.js")
const Booking=require("../models/BookingModel.js")

router.get("/seeAll",csrfProtection,limiter,auth, async (req,res)=>{
    try {
        const {user} = req.user //on peut prendre userId parce qu'on l'a mis dans le login avec jwt
        const bookings= await Booking.find().populate("voitureReservee")
        res.status(200).json({bookings: bookings})
        }
    catch (err){
        res.status(500)
        console.log("Erreur: ",err)
    }

})

router.delete("/delete",csrfProtection,limiter,auth,async (req,res) => {
    try{
        const {idBooking} = req.body
        const deletedBooking=await Booking.findByIdAndDelete(idBooking) //suppression de l'utilisateur
        console.log("Réservation supprimée")
        res.status(200).json({message: "Réservation supprimée"})
    }catch (err){
        res.status(500)
        console.log("Erreur: ", err)
    }
})

router.get("/see",csrfProtection,limiter,auth, async (req,res)=>{
    try {
        const {user} = req.user //on peut prendre userId parce qu'on l'a mis dans le login avec jwt
        const bookings= await Booking.find({user: user}).populate("voitureReservee")
        res.status(200).json({bookings: bookings})
        }
    catch (err){
        res.status(500)
        console.log("Erreur: ",err)
    }

})

module.exports=router