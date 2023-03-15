const mongoose = require("mongoose");

const Narudzbe = new mongoose.Schema(
  {
    proizvod: { type: String, required: true },
    kolicina: { type: Number, required: true, unique: true },
    ciscenje: { type: Boolean, required: true },
    pecenje: { type: Boolean, required: true },
  },
  { collection: "narudzbe" }
);

const model = mongoose.model("Narudzbe", Narudzbe);

module.exports = model;
