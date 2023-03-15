const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Narudzbe = require("./models/narudzbe.model");
const Cijene = require("./models/cijene.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = User;
module.exports = Narudzbe;
module.exports = Cijene;

// enables cors
app.use(cors());
app.use(express.json());

// connection to database thats currently running locally
mongoose.connect("mongodb://localhost:27017/ribarnica-db");

// creating api for registering which probably wont be used at all
app.post("/api/register", async (req, res) => {
  try {
    /**
     * hashing password so we can't see the actual password inside the database
     * which is useful when making open application
     */
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/naruci", async (req, res) => {
  console.log("req", req);
  try {
    await Narudzbe.create({
      proizvod: req.body.proizvod,
      kolicina: req.body.kolicina,
      ciscenje: req.body.ciscenje,
      pecenje: req.body.pecenje,
      cijena: req.body.cijena,
      brojNarudzbe: req.body.brojNarudzbe,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log("greska", err);
    res.json({ status: "error", error: "BIG ERROR" });
  }
});

app.get("/api/svenarudzbe", async (req, res) => {
  try {
    const narudzbe = await Narudzbe.find();
    console.log("NARUDZBE", narudzbe);
    return res.json(narudzbe);
  } catch (err) {
    return res.json({ status: "error", error: err });
  }
});

app.get("/api/cijene", async (req, res) => {
  try {
    const cijene = await Cijene.find();
    console.log("cijene", cijene);
    return res.json(cijene);
  } catch (err) {
    return res.json({ status: "error", error: err });
  }
});

/**
 * api used for logging in
 * simply checking if the email from body matches any inside the database
 *
 */
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  // if the password is valid, create a token
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

// making the app listen to the 5513 port
app.listen(5513, () => {
  console.log("server started");
});
