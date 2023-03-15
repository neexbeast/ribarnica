const mongoose = require("mongoose");

const Cijene = new mongoose.Schema(
  {
    proizvod: { type: String, required: true },
    cijena: { type: Number },
  },
  { collection: "cijene" }
);

const model = mongoose.model("Cijene", Cijene);

module.exports = model;
