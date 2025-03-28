const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  marque: String,
  modele: String,
  plaque: String,
  imageURL: String,
  type: String,
  nb_places: Number,
  prix: Number,
  carburant: String,
  transmission: String,
  description: String
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;