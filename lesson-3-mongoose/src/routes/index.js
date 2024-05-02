/**
 * All the routes + their middlewares.
 */
const express = require('express');
const router = express.Router();
const {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserByIdHandler
} = require('../controllers');
const { validateUserCreate, validateUserUpdate } = require('../middlewares/userValidate');

router.get('/', getAllUsersHandler);
router.get('/:id', getUserByIdHandler);
router.post('/', validateUserCreate, createUserHandler);
router.put('/:id', validateUserUpdate, updateUserHandler);
router.delete('/:id', deleteUserByIdHandler);

module.exports = router;