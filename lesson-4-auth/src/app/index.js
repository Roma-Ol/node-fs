const express = require('express');
const app = express();
const userRouter = require('../routes/userRoutes');
const movieRouter = require('../routes/movieRoutes');
const authRouter = require('../routes/authRoutes');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(morgan('tiny'));

app.use('/user', userRouter);
app.use('/movie', movieRouter);
app.use('/auth', authRouter);

// Centralized requests error handler.
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

// 404 request Handler.
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not Found',
  });
});

module.exports = { app };