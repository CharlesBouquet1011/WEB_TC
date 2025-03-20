const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  marque: String,
  modele: String,
  prix: Number, //il faudra probablement d'autres propriétés
  ImageURL: String,
  carburant: String,
  transmission: String
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;