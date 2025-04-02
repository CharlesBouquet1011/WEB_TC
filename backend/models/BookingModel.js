const mongoose = require("mongoose");

const BookingSchema=new mongoose.Schema({
  dateDebut: Date,
  dateFin: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  voitureReservee: { type: mongoose.Schema.Types.ObjectId, ref: "Car" }, //ici il faudra référencer la voiture réservée 
  validated: { type: Boolean, default: false }, // Réservation validée ou non

  expiresAt: { type: Date, index: { expires: 0 } }, // Index TTL conditionnel
});

BookingSchema.pre("save", function (next) {
  if (this.isModified("validated")) {

  if (!this.validated) {
    this.expiresAt = new Date(Date.now() + 30 * 60 * 1000); // Supprime 30 minutes plus tard si ce n'est pas validé
  } else {
    this.expiresAt = undefined; // Pas de suppression si validé
  }}
  next();
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports=Booking;