const mongoose = require("mongoose");
const BookingSchema=new mongoose.Schema({
  dateDebut: Date,
  dateFin: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  voitureReservée: { type: mongoose.Schema.Types.ObjectId, ref: "Car" }, //ici il faudra référencer la voiture réservée 
});
const Booking = mongoose.model("Booking", userSchema);

module.exports=Booking