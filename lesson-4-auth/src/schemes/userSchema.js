/**
 * Validation middleware.
 */
const Joi = require('joi');

const createUserSchema = Joi.object({
  firstName: Joi.string().required().min(3).max(30).message('Name must be between 3 and 30 characters'),
  lastName: Joi.string().required().min(3).max(30).message('Surname must be between 3 and 30 characters'),
  age: Joi.number().integer().required().min(16).max(120).message('Age must be a valid integer between 0 and 120'),
  phone_number: Joi.string().required().pattern(/^(?:\+38)?0\d{9}$/).message('Number must be a valid Ukrainian phone number'),
  email: Joi.string().required().email().message('Email must be a valid email address'),
  password: Joi.string().min(6).max(18).required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().required().email().message('Email must be a valid email address'),
  password: Joi.string().min(6).max(18).required(),
});

const updateUserSchema = Joi.object({
  firstName: Joi.string().required().min(3).max(30).message('Name must be between 3 and 30 characters'),
  lastName: Joi.string().required().min(3).max(30).message('Surname must be between 3 and 30 characters'),
  age: Joi.number().integer().min(16).max(120).message('Age must be a valid integer between 0 and 120'),
  phone_number: Joi.string().pattern(/^(?:\+38)?0\d{9}$/).message('Number must be a valid Ukrainian phone number'),
  email: Joi.string().email().message('Email must be a valid email address'),
  password: Joi.string().min(6).max(18).required(),
}).or('firstName', 'lastName', 'age', 'phone_number', 'email');  // Require at least one of these fields

const resendVerificationSchema = Joi.object({
  email: Joi.string().required().email().message('Email must be a valid email address'),
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().required().email().message('Email must be a valid email address'),
  oldPassword: Joi.string().min(6).max(18).required(),
  newPassword: Joi.string().min(6).max(18).required(),
});

module.exports = { createUserSchema, loginUserSchema, updateUserSchema, resendVerificationSchema, resetPasswordSchema };