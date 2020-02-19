const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return next()
    }

    req.user = decoded;
    next()

  });

}