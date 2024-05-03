const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { verifyEntityExists } = require('../utils/verifyEntityExists');
const { ConflictException, BadRequestException } = require('../utils/exceptions');

const registerUser = async (body) => {
  const {
    firstName,
    lastName,
    phone_number,
    age,
    email,
    password,
  } = body;

  const userExists = await User.findOne({ email });

  if (userExists) throw new ConflictException('Email already in use');

  const newUser = new User();

  Object.assign(newUser, {
    firstName,
    lastName,
    phone_number,
    age,
    email,
    password,
  });
  await newUser.save();
};

const loginUser = async (body) => {
  const { email, password } = body;
  const userData = await User.findOne({ email });
  const passwordsMatch = userData ? await bcrypt.compare(password, userData.password) : false;

  if (!passwordsMatch) {
    throw new BadRequestException('Invalid credentials');
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;

  function generateToken(user) {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
  }

  return generateToken(userData);
};

module.exports = { registerUser, loginUser };