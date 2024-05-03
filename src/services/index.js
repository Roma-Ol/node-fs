/**
 * Basically the wrappers for CRUD operations that operate user Input data and
 * returns the updated entity from controller.
 */
const { readFile, writeFile } = require('fs/promises');
const { join: pathJoin } = require('path');
const { updateUserStorage } = require('../utils/updateUserStorage');
const { v4: uuidv4 } = require('uuid');
const { statusCode } = require('../utils/constants');
const userStoragePath = pathJoin(__dirname, '../models/users.json');

const verifyUserExists = async (userId) => {
  const allUsers = await getAllUsers();
  const user = allUsers.find(({ id }) => id === userId);

  if (!user) {
    const error = new Error(`User with ID ${userId} not found`);
    error.statusCode = statusCode.NOT_FOUND;
    throw error;
  }
};

const getAllUsers = async () => {
  const allUsers = await readFile(userStoragePath, 'utf8');

  return JSON.parse(allUsers);
};

const getUserById = async (userId) => {
  await verifyUserExists(userId);
  const allUsers = await getAllUsers();
  return allUsers.find(({ id }) => id === userId);
};

const createUser = async (userData) => {
  const allUsers = await getAllUsers();
  const newUser = { ...userData, id: uuidv4() };
  await updateUserStorage([...allUsers, newUser]);

  return newUser;
};

const updateUser = async (userId, newUserData) => {
  await verifyUserExists(userId);
  const allUsers = await getAllUsers();
  const updatedUsers = allUsers.map(user =>
    user.id === userId ? { ...user, ...newUserData } : user,
  );
  await updateUserStorage(updatedUsers);

  return updatedUsers.find(user => user.id === userId);
};

const deleteUser = async (userId) => {
  await verifyUserExists(userId);
  const allUsers = await getAllUsers();
  const updatedUserList = allUsers.filter(({ id }) => id !== userId);
  await updateUserStorage(updatedUserList);

  return updatedUserList;
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };