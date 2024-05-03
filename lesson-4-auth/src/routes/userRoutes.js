const express = require('express');
const router = express.Router();
const {
  getCurrentUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  getFavoriteMoviesHandler,
  addMovieToFavoriteHandler,
  updateUserHandler,
  deleteUserByIdHandler,
} = require('../controllers/userControllers');
const { validateUserUpdate } = require('../middlewares/userValidate');
const { authGuard } = require('../middlewares/authGuard');

// Movies-related routes.
router.get('/favorites', authGuard, getFavoriteMoviesHandler);
router.post('/favorites/:movieId', authGuard, addMovieToFavoriteHandler);

// CRUD Routes.
router.get('/', authGuard, getCurrentUserHandler);
router.get('/all', authGuard, getAllUsersHandler);
router.get('/:id', authGuard, getUserByIdHandler);
router.put('/:id', authGuard, validateUserUpdate, updateUserHandler);
router.delete('/:id', authGuard, deleteUserByIdHandler);

module.exports = router;