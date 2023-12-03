const express = require('express')
const app = express()





app.get("/", (req, res) => {
  console.log(res.body);
  try {
    res.json(contacto.contacts);
  } catch (error) {
    console.error(error);
    res.status(200).send("Error");
  }
});

app.get("/user/:id", (req, res) => {
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

module.exports = app