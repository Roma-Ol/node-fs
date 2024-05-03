const verifyEntityExists = async (searchCriteria, model, message = 'Entity not found') => {
  const entity = await model.findOne(searchCriteria);

  if (!entity) {
    const error = new Error(message);
    error.statusCode = 404;
    throw error;
  }

  return entity;
};

module.exports = { verifyEntityExists };