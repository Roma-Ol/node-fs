const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Verification } = require('../models');
const { verifyEntityExists } = require('../utils/verifyEntityExists');
const { ConflictException, BadRequestException } = require('../utils/exceptions');
const { createVerificationCode } = require('./verificationService');
const { sendVerificationEmail } = require('./mailingService');

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
  const newVerificationCode = await createVerificationCode(newUser.id);

  Object.assign(newUser, {
    firstName,
    lastName,
    phone_number,
    age,
    email,
    password,
  });

  await sendVerificationEmail(email, newVerificationCode.code);
  await newUser.save();
  await newVerificationCode.save();
};

const resendVerification = async (email) => {
  const user = await verifyEntityExists({ email }, User, 'User with such email does not exist.');
  const verification = await verifyEntityExists({ userId: user.id }, Verification, 'Verification code does not exist or expired.');
  await sendVerificationEmail(email, verification.code);
};


const verifyUser = async (verificationCode) => {
  const verification = await verifyEntityExists({ code: verificationCode }, Verification, 'Verification code does not exist or expired.');
  await verification.deleteOne();
};

const passwordsMatch = async (pass1, pass2) => {
  const match = await bcrypt.compare(pass1, pass2);

  if (!match) throw new BadRequestException('Invalid credentials');
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

const resetPassword = async (email, oldPassword, newPassword) => {
  const user = await verifyEntityExists({ email }, User, 'User does not exist.');
  await passwordsMatch(oldPassword, user.password);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();
};

module.exports = { registerUser, resendVerification, verifyUser, loginUser, resetPassword };