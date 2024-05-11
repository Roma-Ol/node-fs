const { getAllMovies, getMovieById } = require('../services/movieServices');
const { registerUser, loginUser, verifyUser, resendVerification, resetPassword } = require('../services/authService');
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

const verificationHandler = async (req, res) => {
  const { code } = req.params;
  await verifyUser(code);
  res.status(statusCode.OK).json({ status: 'success' });
};

const resendVerificationHandler = async (req, res) => {
  const { body: { email } } = req;
  await resendVerification(email);
  res.status(statusCode.OK).json({ status: 'success' });
};

const resetPasswordHandler = async (req, res) => {
  const { body: { email, oldPassword, newPassword } } = req;
  await resetPassword(email, oldPassword, newPassword);
  res.status(statusCode.OK).json({ status: 'success' });
};

module.exports = {
  registerHandler,
  loginHandler,
  verifyHandler: verificationHandler,
  resendVerificationHandler,
  resetPasswordHandler,
};