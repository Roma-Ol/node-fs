const { getAllMovies, getMovieById } = require('../services/movieServices');
const { registerUser, loginUser } = require('../services/authService');
const { User } = require('../models');
const { statusCode } = require('../utils/constants');

const registerHandler = async (req, res) => {
  const { body } = req;
  await registerUser(body);
  res.status(statusCode.CREATED).json({ status: 'success' });
};

const loginHandler = async (req, res) => {
  const { body } = req;
  const token = await loginUser(body);
  res.status(statusCode.OK).json({ status: 'success', token });
};

module.exports = { registerHandler, loginHandler };