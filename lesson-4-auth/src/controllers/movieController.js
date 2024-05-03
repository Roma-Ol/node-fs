const { getAllMovies, getMovieById } = require('../services/movieServices');
const { statusCode } = require('../utils/constants');

const getAllMoviesHandler = async (req, res, next) => {
  try {
    const movies = await getAllMovies();
    res.status(statusCode.OK).send(movies);
  } catch (err) {
    next(err);
  }
};

const getMovieByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const selectedMovie = await getMovieById(id);

    res.status(statusCode.OK).send(selectedMovie);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllMoviesHandler, getMovieByIdHandler };