/**
 * Basically the wrappers for CRUD operations.
 * It handles the HTTP-specific tasks such as getting the user Input data and
 * returns the updated entity.
 *
 * Each controller here is a middleware.
 */
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../services');

const getAllUsersHandler = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const getUserByIdHandler = async (req, res, next) => {
  try {
    const {id} = req.params;
    const selectedUser = await getUserById(id);
    res.status(200).json(selectedUser);
  } catch (err) {
    next(err);
  }
};

const createUserHandler = async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

const updateUserHandler = async (req, res, next) => {
  try {
    const {id} = req.params;
    const updatedUser = await updateUser(id, req.body);

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUserByIdHandler = async (req, res, next) => {
  try {
    const {id} = req.params;
    await deleteUser(id);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {getAllUsersHandler, getUserByIdHandler, createUserHandler, updateUserHandler, deleteUserByIdHandler};