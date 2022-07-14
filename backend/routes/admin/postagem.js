const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../../models/Postagem');
const Postagem = mongoose.model('postagens');

const errorMessage = {
  "404": { message: 'Postagem não existe' },
  "500": { message: 'Houve um erro interno' }
}

// Endpoint para deletar tudo
router.delete('/all', (req, res) => {
  Postagem.deleteMany().then((_) => res.status(200).send('Apagado'));
});

router.get('/', (req, res) => {
  Postagem.find().populate('categoria').sort({ data: 'desc' })
    .then((postagem) => res.status(200).send(postagem)
    )
    .catch((_) => res.status(404).send(errorMessage[404]));
})

router.post('/', (req, res) => {
  let errors = new Object();

  if (!req.body.titulo || req.body.titulo.length < 4)
    errors.titulo = { invalid: true };

  if (!req.body.slug || req.body.slug.length < 3)
    errors.slug = { invalid: true };

  if (!req.body.descricao || req.body.descricao.length < 4)
    errors.descricao = { invalid: true };

  if (!req.body.conteudo || req.body.conteudo.length < 1 || req.body.conteudo.length > 255)
    errors.conteudo = { invalid: true };

  if (!req.body.categoria || req.body.categoria.length < 4)
    errors.categoria = { invalid: true };


  require('../../models/Categoria')
  const Categoria = mongoose.model('categorias')
  Categoria.findById(req.body.categoria)
    .then((categoria) => {
      if (!categoria) errors.categoria = { invalid: true };

      if (Object.keys(errors).length) {
        res.status(422).send(errors)
      } else {
        const queryPostagem = {
          titulo: req.body.titulo,
          slug: req.body.slug,
          descricao: req.body.descricao,
          conteudo: req.body.conteudo,
          categoria: req.body.categoria
        }

        Postagem.create(queryPostagem)
          .then(() => res.status(201).send({ message: `<b>${queryPostagem.titulo}</b> foi postado` }))
          .catch(() => res.status(404).send(errorMessage[404]));
      }
    })
    .catch(() => {
      errors.categoria = { invalid: true };
      res.status(422).send(errors)
    })
})

router.get('/:id', (req, res) => {
  Postagem.findById(req.params.id).populate('categoria')
    .then((postagem) => postagem ? res.status(200).send(postagem) : res.status(404).send(errorMessage[404]))
    .catch(() => res.status(404).send(errorMessage[404]));
})

router.put('/:id', (req, res) => {
  let errors = new Object();

  if (!req.body.titulo || req.body.titulo.length < 4)
    errors.titulo = { invalid: true };

  if (!req.body.slug || req.body.slug.length < 3)
    errors.slug = { invalid: true };

  if (!req.body.descricao || req.body.descricao.length < 4)
    errors.descricao = { invalid: true };

  if (!req.body.conteudo || req.body.conteudo.length < 1 || req.body.conteudo.length > 255)
    errors.conteudo = { invalid: true };

  if (!req.body.categoria || req.body.categoria.length < 4)
    errors.categoria = { invalid: true };

  require('../../models/Categoria')
  const Categoria = mongoose.model('categorias')
  Categoria.findById(req.body.categoria)
    .then((data) => {
      if (!data) {
        errors.categoria = { invalid: true };
        return res.status(422).send(errors)
      }

      if (Object.keys(errors).length)
        return res.status(422).send(errors);

      Postagem.findByIdAndUpdate(req.params.id, req.body)
        .then((postagem) => postagem ? res.status(200).send({ message: `O post <b>${postagem.titulo}</b> foi editado com sucesso` }) : res.status(404).send(errorMessage[404]))
        .catch((_) => res.status(404).send(errorMessage[404]))

    })
    .catch(() => {
      errors.categoria = { invalid: true };
      res.status(422).send(errors)
    })
})

router.delete('/:id', (req, res) => {
  Postagem.findOneAndDelete(req.params.id)
    .then((postagem) => postagem ? res.status(200).send({ message: `O post <b>${postagem.titulo}</b> foi excluido com sucesso` }) : res.status(404).send(errorMessage[404]))
    .catch((_) => res.status(404).send(errorMessage[404]))
})

module.exports = router