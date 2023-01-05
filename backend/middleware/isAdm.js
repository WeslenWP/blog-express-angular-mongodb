module.exports = function isAdm(req, res, next) {
  console.log(req.user)
  if (req.user.tipo !== "Admin")
    return res.status(403).send({ message: 'Necessário ser administrador' });
  next()
}