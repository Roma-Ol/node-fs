const express = require('express');
const app = express();
const usersRouter = require('./src/routes/index');
const morgan = require('morgan')
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(morgan('dev'));
app.use('/', usersRouter);

// Centralized requests error handler.
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

// 404 request Handler.
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not Found'
  });
});

app.listen(port, (error) => {
  console.log(`Listening on port ${port}`)
})