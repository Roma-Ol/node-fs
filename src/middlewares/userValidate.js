/**
 * Validation middleware.
 */
const Joi = require('joi');
const { statusCode } = require('../utils/constants');

const createUserSchema = Joi.object({
  name: Joi.string().required().min(3).max(30).message('Name must be between 3 and 30 characters'),
  age: Joi.number().integer().required().min(16).max(120).message('Age must be a valid integer between 0 and 120'),
  phone_number: Joi.string().required().pattern(/^(?:\+38)?0\d{9}$/).message('Number must be a valid Ukrainian phone number'),
  email: Joi.string().required().email().message('Email must be a valid email address'),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).message('Name must be between 3 and 30 characters'),
  age: Joi.number().integer().min(16).max(120).message('Age must be a valid integer between 0 and 120'),
  phone_number: Joi.string().pattern(/^(?:\+38)?0\d{9}$/).message('Number must be a valid Ukrainian phone number'),
  email: Joi.string().email().message('Email must be a valid email address'),
}).or('name', 'phone_number', 'email', 'age');  // Require at least one of these fields

const validateUserCreate = (req, res, next) => {
  console.log(req.body);
  const { error } = createUserSchema.validate(req.body);

  if (error) return res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });

  next();
};

const validateUserUpdate = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body);

  if (error) return res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });

  next();
};

module.exports = { validateUserCreate, validateUserUpdate };