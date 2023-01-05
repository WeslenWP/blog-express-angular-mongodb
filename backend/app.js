// Carregando modulos
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
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

// Mongoose
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Banco conectado'))
  .catch((err) => console.log('Erro: \n' + err))

app.use('/api/categoria', [require("./routes/admin/categoria")]);
app.use('/api/postagem', [require("./routes/admin/postagem"), require("./routes/user/postagem")]);


// Outros
app.listen(process.env.PORT, () => console.log('Servidor rodando'));