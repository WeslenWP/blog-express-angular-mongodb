const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../../models/Postagem');
const Postagem = mongoose.model('postagens');

const errorMessage = {
  "404": { message: 'Postagem não existe' },
  "500": { message: 'Houve um erro interno' }
}

router.get('/', (req, res) => {
  Postagem.find().populate('categoria').sort({ data: 'desc' })
    .then((postagem) => res.status(200).send(postagem)
    )
    .catch((_) => res.status(500).send(errorMessage[500]));
})

router.get('/bySlug/:slug', (req, res) => {
  Postagem.find({ slug: req.params.slug }).populate('categoria').sort({ data: 'desc' })
    .then((postagem) => {
      if (postagem) {
        // postagem[0].conteudo = postagem[0].conteudo.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, " <br> ")
        res.status(200).send(postagem[0])
      } else {
        res.status(404).send(errorMessage[404])
      }
    })
    .catch((_) => res.status(500).send(errorMessage[500]));
})

router.get('/byCategoria/:id', (req, res) => {
  Postagem.find({ categoria: req.params.id }).populate('categoria').sort({ data: 'desc' })
    .then((postagem) => {
      if (postagem) {
        res.status(200).send(postagem)
      } else {
        res.status(404).send(errorMessage[404])
      }
    })
    .catch((_) => { res.status(500).send(errorMessage[500]) });
})

module.exports = router