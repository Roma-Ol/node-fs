/**
 * Basically the wrappers for CRUD operations that operate user Input data and
 * returns the updated entity from controller.
 */
const { join: pathJoin } = require('path');
const { User } = require('../models/usersModel');

const verifyUserExists = async (userId) => {
  const user = await User.exists({ _id: userId });

  if (!user) {
    const error = new Error(`User with ID ${userId} not found`);
    error.statusCode = 404;
    throw error;
  }
};

const getAllUsers = async () => {
  const allUsers = await User.find();

  return allUsers;
};

const getUserById = async (userId) => {
  await verifyUserExists(userId);
  const selectedUser = await User.findById(userId);

  return selectedUser;
};

const createUser = async (userData) => {
  // Check if email fields is unique.
  const emailIsUnique = await User.findOne({ email: userData.email });
  if (!!emailIsUnique) throw new Error(`User with this email (${userData.email}) already exists!`);

  const newUser = await User.create(userData);
  return newUser;
};

const updateUser = async (userId, newUserData) => {
  await verifyUserExists(userId);
  const updatedUser = User.findByIdAndUpdate(userId, newUserData, { new: true });

  return updatedUser;
};

const deleteUser = async (userId) => {
  await verifyUserExists(userId);
  await User.findByIdAndDelete(userId);
  return;
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };