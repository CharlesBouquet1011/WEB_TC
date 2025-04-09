const express = require("express");
const router = express.Router();
const Assistance = require("../models/AssistanceModel.js");
const auth = require("../config/authenticator.js");


// Route pour utilisateurs non connectés
router.post("/submit-assistance/public", (req, res) => {
    handleAssistanceSubmission(req, res);
  });
  
  // Route pour utilisateurs connectés
router.post("/submit-assistance/connecte", auth, (req, res) => {
    handleAssistanceSubmission(req, res, req.user.email);
  });

async function handleAssistanceSubmission(req, res, emailFromAuth = null) {
  try {
    const { sujet, description, email } = req.body;

    // Si l'email est manquant, utilise celui du user (si fourni par le middleware `auth`)
    const mail = email || emailFromAuth;

    if (!sujet || !description || !mail) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const newDemande = new Assistance({
      sujet,
      description,
      email: mail,
    });

    console.log(newDemande);
    await newDemande.save();

    res.status(200).json({ message: "Demande d'assistance enregistrée avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la demande d'assistance :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
}


module.exports = router;
