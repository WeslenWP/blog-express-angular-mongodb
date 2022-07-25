const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../../models/Categoria');
const Categoria = mongoose.model('categorias');

const errorMessage = {
  "404": { message: 'Categoria não existe' },
  "409": { message: "Já existe uma categoria com esse nome" },
  "500": { message: 'Houve um erro interno' }
}

// Endpoint para deletar tudo
router.delete('/all', (req, res) => {
  require('../../models/Postagem');
  const Postagem = mongoose.model('postagens');
  Categoria.deleteMany().then((_) => Postagem.deleteMany().then(() => res.status(200).send('Apagado')));
});

router.get('/', (req, res) => {
  Categoria.find().sort({ data: 'desc' })
    .then((categorias) => res.status(200).send(categorias))
    .catch((_) => res.status(500).send(errorMessage[500]));
})

router.post('/', (req, res) => {
  let errors = new Object();

  if (!req.body.nome || req.body.nome.length < 4)
    errors.nome = { invalid: true };

  if (Object.keys(errors).length) {
    res.status(422).send(errors)
  } else {
    const slug = req.body.nome.trim().toLowerCase().replace(' ', '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const queryCategoria = {
      nome: req.body.nome,
      slug: slug
    }

    Categoria.create(queryCategoria)
      .then(() => res.status(201).send({ message: `A categoria <b>${queryCategoria.nome}</b> foi criada com sucesso` }))
      .catch((err) => {
        switch (err.code) {
          case 11000:
            res.status(409).send(errorMessage[409])
            break;
          default:
            res.status(500).send(errorMessage[500])
            break;
        }
      });
  }
})

router.get('/:id', (req, res) => {
  Categoria.findById(req.params.id)
    .then((categoria) => categoria ? res.status(200).send(categoria) : res.status(404).send(errorMessage[404]))
    .catch((_) => res.status(404).send(errorMessage[404]))
})

router.put('/:id', (req, res) => {
  let errors = new Object();

  if (!req.body.nome || req.body.nome.length < 4) errors.nome = { invalid: true };


  if (Object.keys(errors).length) {
    res.status(422).send(errors)
  } else {
    const slug = req.body.nome.trim().toLowerCase().replace(' ', '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const queryCategoria = {
      nome: req.body.nome,
      slug: slug
    }

    Categoria.findByIdAndUpdate(req.params.id, queryCategoria)
      .then((categoria) =>
        categoria
          ? res.status(201).send({ message: `A categoria <b>${categoria.nome}</b> foi atualizada com sucesso` })
          : res.status(404).send(errorMessage[404]))
      .catch((err) => {
        switch (err.code) {
          case 11000:
            res.status(409).send(errorMessage[409])
            break;
          default:
            res.status(500).send(errorMessage[500])
            break;
        }
      });
  }
})

router.delete('/:id', (req, res) => {
  require('../../models/Postagem');
  const Postagem = mongoose.model('postagens');

  Postagem.deleteMany({ categoria: req.params.id }).then(
    () => Categoria.findByIdAndDelete(req.params.id)
      .then((categoria) => categoria ? res.status(200).send({ message: `A categoria <b>${categoria.nome}</b> foi removida com sucesso` }) : res.status(404).send(errorMessage[404]))
      .catch((_) => res.status(404).send(errorMessage[404]))
  ).catch((_) => res.status(500).send(errorMessage[500]))
})

module.exports = router