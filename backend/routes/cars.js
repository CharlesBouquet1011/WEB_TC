
const express = require("express");
const router = express.Router();
const csrfProtection=require("../config/csrf.js");

const limiter = require("../config/rateLimiter.js");
require('dotenv').config();

const Cars=require("../models/CarModel.js")


router.get("/",csrfProtection, async (req,res)=>{
    try {
        const voitures= await Cars.find({})
        res.status(200).json({voitures: voitures})
    }
    catch (err){
        res.status(500).json({erreur: "Erreur serveur"})
        console.log("Erreur: ",err)
    }

})
module.exports=router