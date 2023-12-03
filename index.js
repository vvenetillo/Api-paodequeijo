/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

const Contato = require('./models/User');

const app = express();

const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*",
    methods: "GET, POST",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a API!" });
});

app.post("/contact", async (req, res) => {
  try {
    const { fname, femail, ftelefone, fcidade, fmensagem, fbairro } = req.body;

    const parsedFcep = parseInt(fcep, 10);

    const newContact = new Contato({
      fname,
      femail,
      ftelefone,
      fcidade,
      fmensagem,
      fbairro,
      fcep: parsedFcep,
    });

    const savedContact = await newContact.save();

    res.status(201).json({
      id: savedContact._id,
      fname: savedContact.fname,
      femail: savedContact.femail,
      ftelefone: savedContact.ftelefone,
        fcidade: savedContact.fcidade,
        fmensagem: savedContact.fmensagem,
        fbairro: savedContact.fbairro,
        fcep: savedContact.fcep
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// ...

app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const Contacto = await Contato.findById(id);
    
    if (!Contacto) {
      // Handle the case where no user is found with the given userId
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: Contacto._id,
      fname: Contacto.fname,
      femail: Contacto.femail,
      ftelefone: Contacto.ftelefone,
        fcidade: Contacto.fcidade,
        fmensagem: Contacto.fmensagem,
        fbairro: Contacto.fbairro,
        fcep: Contacto.fcep,
        Contacto
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

// ...

// Other routes...

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPassword}@cluster0.a7o4it1.mongodb.net/?retryWrites=true&w=majority`
)
  .then(() => {
    console.log('Connected to the database');
    app.listen(port, () => {
      try {
        console.log(`Server is running on port ${port}`);
      } catch (err) {
        console.error(err);
      }
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB", err));
