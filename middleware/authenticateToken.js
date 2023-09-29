const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

function authenticateToken(req, res, next) {
  const AuthHeader = req.header('Authorization');

  if (!AuthHeader) {

    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = AuthHeader.split(" ")[1];
  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
        console.log(err)
      return res.status(403).json({ message: 'Forbidden' });
    }
    console.log(user.userId);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
