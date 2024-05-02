const express = require('express');
const app = express();
const usersRouter = require('./src/routes/index');
const morgan = require('morgan')
const { statusCode } = require('./src/utils/constants')
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(morgan('dev'));
app.use('/', usersRouter);

// 404 request Handler.
app.use((req, res, next) => {
  res.status(statusCode.NOT_FOUND).json({
    status: 'error',
    code: statusCode.NOT_FOUND,
    message: 'Not Found'
  });
});


// Centralized requests error handler.
app.use((err, req, res, next) => {
  res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

app.listen(port, (error) => {
  console.log(`Listening on port ${port}`)
})