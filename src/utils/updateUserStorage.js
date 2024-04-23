const { join: pathJoin } = require('path');
const { writeFile } = require('fs/promises');

/**
 * Updates the content of users.json file.
 *
 * @param content New content of the file.
 */
const updateUserStorage = async (content) => {
  const usersStoragePath = pathJoin(__dirname, '../models/users.json');
  await writeFile(usersStoragePath, JSON.stringify(content, 'utf-8'));
}

module.exports = {updateUserStorage};