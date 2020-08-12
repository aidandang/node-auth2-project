const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const generateToken = require('../utils/generateToken');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid input fields.'
    })
  }

  const hash = bcrypt.hashSync(password);
  let user = {};
  user.username = username;
  user.password = hash;
  
  const newUser = await User.add(user);

  res.status(201).json({
    status: 'success',
    message: `Registered successfully. Welcome, ${user.username}.`
  })
})

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid username or password.'
    })
  }

  const found = await User.findBy(username);

  if (found && bcrypt.compareSync(password, found.password)) {
    const token = generateToken(found);

    res.status(201).json({
      message: `Welcome, ${found.username}.`,
      token
    })
  } else {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid username or password.'
    })
  }
})

exports.protect = (req, res, next) => {
  let token = null;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          status: 'fail',
          message: 'Token is invalid.'
        })
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    })
  } else {
    res.status(401).json({
      status: 'fail',
      message: 'Token is not included.'
    })
  }
}