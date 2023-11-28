/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3001;

// Politica de privacidade do cors
app.use(
  cors({
    origin: "*",
    methods: "GET, POST",
    allowedHeaders: "Content-Type, Authorization",
  })
);

// Leitura em formato Json
app.use(express.json());

//Importação do model
let contacto = {
  contacts: [],
};

// rotas

app.get("/", (req, res) => {
  console.log(res.body);
  try {
    res.json(contacto.contacts);
  } catch (error) {
    console.error(error);
    res.status(200).send("Error");
  }
});

app.post("/contact", (req, res) => {
  try {
    const newContacto = {
      fname: req.body.fname,
      femail: req.body.femail,
      ftelefone: req.body.ftelefone,
      endereco: {
        fcep: req.body.fcep,
        fcidade: req.body.fcidade,
        fbairro: req.body.fbairro,
        fmensagem: req.body.fmensagem,
      },
    };

    contacto.contacts.push(newContacto);
    res.status(201).json(newContacto);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  
  try{
    console.log(`Servidor está rodando na porta ${port}`);

  }
  catch (err) {
    console.error(err);
  }
});