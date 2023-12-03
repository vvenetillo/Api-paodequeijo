/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')


// Define o array de objetos 'contacto' com os campos especificados
const contato = mongoose.model('Contato' ,
    {
      
      fname: String,
      femail: String,
      ftelefone: Number,
      fcidade: String,
      fmensagem: String,
      fbairro: String,
      fcep: Number
      
    })
  
  // eslint-disable-next-line no-undef 
  module.exports = contato