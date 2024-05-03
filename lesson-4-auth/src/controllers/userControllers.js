const {
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser, addMovieToFavorite, getFavoriteMovies,
} = require('../services/userServices');
const { statusCode } = require('../utils/constants');

/**
 * User CRUD actions.
 */
const getCurrentUserHandler = async (req, res, next) => {
  try {
    const { user: { id } } = req;
    const user = await getCurrentUser(id);
    res.status(statusCode.OK).send(user);
  } catch (err) {
    next(err);
  }
};

const getAllUsersHandler = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(statusCode.OK).send(users);
  } catch (err) {
    next(err);
  }
};

const getUserByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const selectedUser = await getUserById(id);

    res.status(statusCode.OK).send(selectedUser);
  } catch (err) {
    next(err);
  }
};

const updateUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUser(id, req.body);
    res.status(statusCode.OK).send(updatedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUserByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteUser(id);

    res.status(statusCode.DELETED).send();
  } catch (err) {
    next(err);
  }
};

/**
 * Movies handler.
 */
const addMovieToFavoriteHandler = async (req, res, next) => {
  try {
    const { user: { id: userId }, params: { movieId } } = req;
    const updatedUser = await addMovieToFavorite(userId, movieId);

    res.status(statusCode.OK).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

const getFavoriteMoviesHandler = async (req, res, next) => {
  try {
    const { id } = req.user;
    const favoriteMovies = await getFavoriteMovies(id);
    res.status(statusCode.OK).json(favoriteMovies);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCurrentUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserByIdHandler,
  addMovieToFavoriteHandler,
  getFavoriteMoviesHandler,
};