const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const generateToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: '8h'
  };

  return jwt.sign(payload, secret, options);
}

module.exports = generateToken;