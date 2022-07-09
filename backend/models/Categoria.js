const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categoria = new Schema({
  nome: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    require: true
  },
  data: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model('categorias', Categoria);