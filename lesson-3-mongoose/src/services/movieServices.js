const { Movie } = require('../models');
const { verifyEntityExists } = require('../utils/verifyEntityExists');

const getAllMovies = async () => {
  const allMovies = await Movie.find();

  return allMovies;
};

const getMovieById = async (movieId) => {
  await verifyEntityExists(movieId, Movie);
  const selectedMovie = await Movie.findById(movieId);

  return selectedMovie;
};

module.exports = { getAllMovies, getMovieById };