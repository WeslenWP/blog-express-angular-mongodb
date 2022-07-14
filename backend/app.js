// Carregando modulos
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

const categoriaRoute = require('./routes/admin/categoria');
const postagemRoute = require('./routes/admin/postagem');
/* Configurações */

// Cors
app.use(cors());

// Sessão
app.use(session({
  secret: 'chaveultrasecreta',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

// Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

//  Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mongoose
mongoose.connect('mongodb://localhost/blogapp')
  .then(() => console.log('Banco conectado'))
  .catch((err) => console.log('Erro: \n' + err))

// Rotas
app.use('/api/categoria', categoriaRoute);
app.use('/api/postagem', postagemRoute);


// Outros
const PORT = 8081;
app.listen(PORT, () => console.log('Servidor rodando'));