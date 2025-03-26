const mongoose = require("../config/mongo");

const userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: Number,
  email: { type: String, unique: true, required: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;