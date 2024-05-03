/**
 * Basically the wrappers for CRUD operations that operate user Input data and
 * returns the updated entity from controller.
 */
const { join: pathJoin } = require('path');
const { User, Movie } = require('../models');
const { verifyEntityExists } = require('../utils/verifyEntityExists');
const { getMovieById } = require('./movieServices');
const { NotFoundException } = require('../utils/exceptions');

const getCurrentUser = async (userId) => await getUserById(userId);

const getAllUsers = async () => {
  const allUsers = await User.find();

  return allUsers;
};

const getUserById = async (userId) => {
  await verifyEntityExists({ _id: userId }, User);
  const selectedUser = await User.findById(userId);

  return selectedUser;
};

const updateUser = async (userId, newUserData) => {
  await verifyEntityExists({ _id: userId }, User);
  const updatedUser = User.findByIdAndUpdate(userId, newUserData, { new: true });

  return updatedUser;
};

const deleteUser = async (userId) => {
  await verifyEntityExists(userId, User);
  await User.findByIdAndDelete(userId);
};

const addMovieToFavorite = async (userId, movieId) => {
  await verifyEntityExists({ _id: movieId }, Movie);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { favoriteMovies: movieId } },
    { new: true, safe: true, upsert: false }, // options
  ).populate('favoriteMovies');

  return updatedUser;
};

const getFavoriteMovies = async (userId) => {
  const userMovies = await User.findById(userId)
    .populate('favoriteMovies')
    .exec();

  return userMovies.favoriteMovies;
};

module.exports = {
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addMovieToFavorite,
  getFavoriteMovies,
};