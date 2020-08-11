const express = require('express');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

const server = express();

server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

module.exports = server;