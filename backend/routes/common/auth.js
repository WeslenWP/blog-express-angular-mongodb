const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('../../models/User');
const User = mongoose.model('usuarios');

const errorMessage = {
  "404": { message: 'Usuário não encontrado' },
  "409": { message: 'Usuário já registrado' },
  "500": { message: 'Houve um erro interno' }
}

const validateEmail = (email) => {
  return !!email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

const generateTokens = (user) => {
  const accessToken = jwt.sign({
    id: user._id,
    tipo: user.tipo
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

  const refreshToken = jwt.sign({
    id: user._id,
    tipo: user.tipo,
    accessToken
  }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "15 days" });

  return { accessToken, refreshToken }
}


router.get('/', async (req, res) => {
  console.log(req.secure)
  res.send(await User.find())
})

router.post('/register', (req, res) => {
  const { nome, email, senha } = req.body
  let errors = new Object();

  if (!nome || nome.length < 2)
    errors.nome = { invalid: true };

  if (!email || !validateEmail(email))
    errors.email = { invalid: true };

  if (!senha || senha.length < 6)
    errors.senha = { invalid: true };

  if (Object.keys(errors).length) {
    res.status(422).send(errors)
  } else {
    User.find({ email }).then((findedUser) => {

      if (findedUser.length)
        return res.status(409).send(errorMessage[409]);

      const queryUser = {
        nome, email, senha
      }

      User.create(queryUser)
        .then(() => res.status(201).send())
        .catch(() => res.status(500).send(errorMessage[500]))
    })
  }
})

router.post('/', async (req, res) => {
  const { email, senha } = req.body

  const user = await User.findOne({ email })

  if (!user) return res.status(404).send({ email: { invalid: true } });

  if (senha !== user.senha) return res.status(401).send({ senha: { invalid: true } });

  const tokens = generateTokens(user);

  require('../../models/Token')
  const Token = mongoose.model('tokens')
  await Token.create(tokens);

  const response = {
    user: {
      nome: user.nome,
      email: user.email,
      tipo: user.tipo
    },
    accessToken: tokens.accessToken
  }

  return res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    maxAge: 1296000000,
    secure: process.env.NODE_ENV !== 'DEV',
    sameSite: true
  }).status(200).send(response);
})

router.post('/refresh', async (req, res) => {
  require('../../models/Token')
  const Token = mongoose.model('tokens')

  const refreshToken = req.cookies.refreshToken;

  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    const data = await Token.findOne({ refreshToken })
    if (data) {
      await Token.findByIdAndDelete(data._id);
      const tokens = generateTokens({
        _id: user.id,
        tipo: user.tipo
      })

      await Token.create(tokens);
      return res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        maxAge: 1296000000,
        secure: process.env.NODE_ENV !== 'DEV',
        sameSite: true
      }).status(200).send({ accessToken: tokens.accessToken });
    } else {
      res.status(400).send({
        name: "JsonWebTokenError",
        message: "invalid token"
      })
    }
  } catch (err) {
    return res.clearCookie('refreshToken').status(401).send({ err })
  }
})

router.get('/me', require('../../middleware/authToken'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    const response = {
      nome: user.nome,
      email: user.email,
      tipo: user.tipo
    }

    return res.status(200).send(response);
  } catch {
    return res.status(401).send()
  }
})

router.delete('/all', (req, res) => User.deleteMany().then(() => res.send()))

module.exports = router