const mongoose = require("mongoose");

const bookedSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  time: String,
  wait: Number,
});

const Booked = mongoose.model("bookings", bookedSchema);

module.exports = Booked;
