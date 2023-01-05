const mongoose = require('mongoose');
const Schema = mongoose.Schema

const User = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  senha: {
    type: String,
    required: true, 
    min: 6
  },
  tipo: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User'
  }
})

mongoose.model("usuarios", User);
