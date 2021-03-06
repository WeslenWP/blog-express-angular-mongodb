// Carregando modulos
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const fs = require('fs')

/* Configurações */
// Cors
app.use(cors({
  origin: 'http://localhost:4200'
}));

// Sessão
app.use(session({
  secret: 'chaveultrasecreta',
  resave: true,
  saveUninitialized: true
}));

// Middleware
app.use((req, res, next) => {
  next();
});

//  Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mongoose
mongoose.connect('mongodb://localhost/blogapp')
  .then(() => console.log('Banco conectado'))
  .catch((err) => console.log('Erro: \n' + err))

app.use('/api/categoria', [require("./routes/admin/categoria"), require("./routes/user/categoria")]);
app.use('/api/postagem', [require("./routes/admin/postagem"), require("./routes/user/postagem")]);


// Outros
const PORT = 8081;
app.listen(PORT, () => console.log('Servidor rodando'));