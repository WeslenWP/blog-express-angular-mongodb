// Carregando modulos
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const cookie = require('cookie-parser');

require('dotenv').config();

/* Configurações */
// Cors
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL
}));

//  Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookie
app.use(cookie())

// Mongoose
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Banco conectado'))
  .catch((err) => console.log('Erro: \n' + err))


app.use('/api/categoria', require("./routes/authenticated/categoria"));
app.use('/api/postagem', [require("./routes/common/postagem"), require("./routes/authenticated/postagem")]);
app.use('/api/auth', require("./routes/common/auth"));

// Outros
app.listen(process.env.PORT, async () => {
  require('./models/Token')
  console.log('Servidor rodando')
});