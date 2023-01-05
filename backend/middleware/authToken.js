const jwt = require('jsonwebtoken');

module.exports = function authenticateToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];

  if (token == null) return res.status(401).send();

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.clearCookie('refreshToken').status(401).send({ err });
    req.user = user;
    next();
  });
}