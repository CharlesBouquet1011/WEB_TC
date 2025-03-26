const mongoose = require("../config/mongo");
const BookingSchema=new mongoose.Schema({
  dateDebut: Date,
  dateFin: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  voitureReservee: { type: mongoose.Schema.Types.ObjectId, ref: "Car" }, //ici il faudra référencer la voiture réservée 
});
const Booking = mongoose.model("Booking", BookingSchema);

module.exports=Booking