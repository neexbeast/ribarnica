const mongoose = require("mongoose");

const Narudzbe = new mongoose.Schema(
  {
    brojNarudzbe: { type: Number, required: true, unique: true, index: true },
    proizvod: { type: String, required: true },
    kolicina: { type: Number, required: true },
    ciscenje: { type: Boolean, required: true },
    pecenje: { type: Boolean, required: true },
    cijena: { type: Number },
  },
  { collection: "narudzbe" }
);

const model = mongoose.model("Narudzbe", Narudzbe);

module.exports = model;
