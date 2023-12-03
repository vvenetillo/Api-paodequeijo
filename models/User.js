/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

// Define the schema for the 'contacto' collection
const contatoSchema = new mongoose.Schema({
  fname: String,
  femail: String,
  ftelefone: Number,
  fcidade: String,
  fmensagem: String,
  fbairro: String,
  fcep: String,
});

// Create the 'Contato' model using the defined schema
const Contato = mongoose.model('Contato', contatoSchema);

module.exports = Contato;
