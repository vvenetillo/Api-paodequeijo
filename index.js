/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Contato = require("./models/User");

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

// Rota para verificar se a API está funcionando
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a API!" });
});

// Rota para criar um novo contato
app.post("/contact", async (req, res) => {
  const { fname, femail, ftelefone, fcidade, fmensagem, fbairro, fcep } = req.body;
  const parsedFcep = parseInt(fcep, 10);

  try {
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
      fcep: savedContact.fcep,
      createdAt: savedContact.createdAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Rota para pegar todos os contatos
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contato.find();
    res.json(contacts); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching contacts");
  }
});

// Rota para pegar um contato específico pelo ID
app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contato.findById(id); // Busca pelo ID do contato

    if (!contact) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: contact._id,
      fname: contact.fname,
      femail: contact.femail,
      ftelefone: contact.ftelefone,
      fcidade: contact.fcidade,
      fmensagem: contact.fmensagem,
      fbairro: contact.fbairro,
      fcep: contact.fcep,

    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching contact");
  }
});

// Conectando ao MongoDB
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.a7o4it1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB", err));
