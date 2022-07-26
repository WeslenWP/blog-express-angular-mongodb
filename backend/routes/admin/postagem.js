const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../../models/Postagem');
const Postagem = mongoose.model('postagens');

const errorMessage = {
  "404": { message: 'Postagem não existe' },
  "409": { message: "Já existe uma postagem com esse titulo" },
  "500": { message: 'Houve um erro interno' }
}

// Endpoint para deletar tudo
router.delete('/all', (req, res) => {
  Postagem.deleteMany().then((_) => res.status(200).send('Apagado'));
});


router.post('/', (req, res) => {
  let errors = new Object();

  if (!req.body.titulo || req.body.titulo.length < 4)
    errors.titulo = { invalid: true };

  if (!req.body.descricao || req.body.descricao.length < 4)
    errors.descricao = { invalid: true };

  if (!req.body.conteudo || req.body.conteudo.length < 1 || req.body.conteudo.length > 2000)
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
        const slug = req.body.titulo.trim().toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const queryPostagem = {
          titulo: req.body.titulo,
          slug: slug,
          descricao: req.body.descricao,
          conteudo: req.body.conteudo,
          categoria: req.body.categoria
        }

        Postagem.create(queryPostagem)
          .then(() => res.status(201).send({ message: `<b>${queryPostagem.titulo}</b> foi postado` }))
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
    .catch(() => {
      errors.categoria = { invalid: true };
      res.status(422).send(errors)
    })
})

router.get('/:id', (req, res) => {
  Postagem.findOne({ _id: req.params.id }).populate('categoria')
    .then((postagem) => postagem ? res.status(200).send(postagem) : res.status(404).send(errorMessage[404]))
    .catch(() => res.status(500).send(errorMessage[500]));
})

router.put('/:id', (req, res) => {
  let errors = new Object();

  if (!req.body.titulo || req.body.titulo.length < 4)
    errors.titulo = { invalid: true };

  if (!req.body.descricao || req.body.descricao.length < 4)
    errors.descricao = { invalid: true };

  if (!req.body.conteudo || req.body.conteudo.length < 1 || req.body.conteudo.length > 2000)
    errors.conteudo = { invalid: true };

  if (!req.body.categoria || req.body.categoria.length < 4)
    errors.categoria = { invalid: true };

  require('../../models/Categoria')
  const Categoria = mongoose.model('categorias')
  Categoria.findById(req.body.categoria)
    .then((data) => {
      if (!data) errors.categoria = { invalid: true };

      if (Object.keys(errors).length) {
        return res.status(422).send(errors)
      } else {
        const slug = req.body.titulo.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');

        const queryPostagem = {
          titulo: req.body.titulo,
          slug: slug,
          descricao: req.body.descricao,
          conteudo: req.body.conteudo,
          categoria: req.body.categoria
        }
        Postagem.findByIdAndUpdate(req.params.id, queryPostagem)
          .then((postagem) => postagem ? res.status(200).send({ message: `O post <b>${postagem.titulo}</b> foi editado com sucesso` }) : res.status(404).send(errorMessage[404]))
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
    .catch(() => {
      errors.categoria = { invalid: true };
      res.status(422).send(errors)
    })
})

router.delete('/:id', (req, res) => {
  Postagem.findByIdAndDelete(req.params.id)
    .then((postagem) => postagem ? res.status(200).send({ message: `O post <b>${postagem.titulo}</b> foi excluido com sucesso` }) : res.status(404).send(errorMessage[404]))
    .catch((_) => res.status(500).send(errorMessage[500]))
})

module.exports = router