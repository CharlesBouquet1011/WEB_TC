const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  marque: String,
  modele: String,
  plaque: String,
  prix: Number, //il faudra probablement d'autres propriétés
  imageURL: String,
  carburant: String,
  transmission: String,
  description: String
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;