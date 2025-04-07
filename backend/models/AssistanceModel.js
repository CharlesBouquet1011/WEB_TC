const mongoose = require("mongoose");

const assistanceSchema = new mongoose.Schema({
  sujet: String,
  description: String,
  email: String, // rempli automatiquement avec le user ou demandé si non connecté
  dateSoumission: { type: Date, default: Date.now }
});

const Assistance = mongoose.model("Assistance", assistanceSchema);

module.exports = Assistance;
