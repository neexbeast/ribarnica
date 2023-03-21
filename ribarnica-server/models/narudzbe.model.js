const mongoose = require("mongoose");

const Narudzbe = new mongoose.Schema(
  {
    brojNarudzbe: { type: Number, required: true, unique: true, index: true },
    proizvod: { type: String, required: true },
    kolicina: { type: Number, required: true },
    ciscenje: { type: Boolean, required: true },
    pecenje: { type: Boolean, required: true },
    cijena: { type: Number, required: true },
    imePrezime: { type: String, required: true },
    datum: { type: String, required: true },
    vrijeme: { type: String, required: true },
    isporuceno: { type: Boolean },
    spremljeno: { type: Boolean },
    otkazano: { type: Boolean },
  },
  { collection: "narudzbe" }
);

const model = mongoose.model("Narudzbe", Narudzbe);

module.exports = model;
