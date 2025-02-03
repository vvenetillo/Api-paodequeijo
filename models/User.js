/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const contatoSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  fname: String,
  femail: String,
  ftelefone: Number,
  fcidade: String,
  fmensagem: String,
  fbairro: String,
  fcep: String,
  createdAt: {
    type: Date,
    default: Date.now 
  }
});

const Contato = mongoose.model('Contato', contatoSchema);

module.exports = Contato;
