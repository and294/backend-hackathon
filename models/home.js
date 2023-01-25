const mongoose = require("mongoose");

const voyageSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  price: Number,
});

const Voyage = mongoose.model("trips", voyageSchema);

module.exports = Voyage;
