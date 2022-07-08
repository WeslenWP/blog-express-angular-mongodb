const mongoose = require('mongoose');
require('../models/Categoria');
const Categoria = mongoose.model('categorias');

const categoriaRoute = (app) => {
  app.route('/api/categoria')
    .get((req, res) => {
      Categoria.find().sort({ date: 'desc' })
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(500).send(err));
    })
    .post((req, res) => {
      let errors = new Object();

      if (!req.body.nome || req.body.nome.length < 4)
        errors.nome = { invalid: true };

      if (!req.body.slug || req.body.slug.length < 4)
        errors.slug = { invalid: true };

      if (Object.keys(errors).length) {
        res.status(422).send(errors)
      } else {
        new Categoria(req.body).save()
          .then(() => { res.status(201).send() })
          .catch((err) => res.status(500).send());
      }
    })

  app.route('/api/categoria/:id')
    .get((req, res) => {
      Categoria.findById(req.params.id)
        .then((data) => res.status(200).send(data))
        .catch((_) => res.status(500).send())
    })
    .put((req, res) => {
      Categoria.findById(req.params.id)
        .then((categoria) => {
          let errors = new Object();

          if (!req.body.nome || req.body.nome.length < 4)
            errors.nome = { invalid: true };

          if (!req.body.slug || req.body.slug.length < 4)
            errors.slug = { invalid: true };

          if (Object.keys(errors).length) {
            res.status(422).send(errors)
          } else {
            categoria.nome = req.body.nome
            categoria.slug = req.body.slug

            categoria.save()
              .then((_) => res.status(200).send())
              .catch((_) => res.status(500).send())
          }
        })
        .catch((_) => res.status(500).send())
    })
    .delete((req, res) => {
      Categoria.remove({ _id: req.params.id })
        .then((_) => res.status(200).send())
        .catch((_) => res.status(500).send())
})

  // Endpoint para deletar tudo
  app.delete ('/api/categoria/all', (req, res) => {
    Categoria.deleteMany().then(() => res.status(200).send('Apagado'));
  });

}

module.exports = categoriaRoute