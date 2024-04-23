/**
 * Validation middleware.
 */
const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().required().min(3).max(30).message('Name must be between 3 and 30 characters'),
  favorite_color: Joi.string().required().max(20).message('Favorite color must be 20 characters or less'),
  age: Joi.number().integer().required().min(0).max(120).message('Age must be a valid integer between 0 and 120'),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).message('Name must be between 3 and 30 characters'),
  favorite_color: Joi.string().max(20).message('Favorite color must be 20 characters or less'),
  age: Joi.number().integer().min(0).max(120).message('Age must be a valid integer between 0 and 120'),
}).or('name', 'favorite_color', 'age');  // Require at least one of these fields

const validateUserCreate = (req, res, next) => {
  console.log(req.body);
  const { error } = createUserSchema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

const validateUserUpdate = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

module.exports = { validateUserCreate, validateUserUpdate };