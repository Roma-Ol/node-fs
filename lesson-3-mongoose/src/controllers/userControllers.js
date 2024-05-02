const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../services/userServices');

const getAllUsersHandler = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

const getUserByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const selectedUser = await getUserById(id);

    res.status(200).send(selectedUser);
  } catch (err) {
    next(err);
  }
};

const createUserHandler = async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);

    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
};

const updateUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUser(id, req.body);

    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUserByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteUser(id);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserByIdHandler,
};