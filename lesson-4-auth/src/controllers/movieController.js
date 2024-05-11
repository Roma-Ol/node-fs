const { getAllMovies, getMovieById, getAggregatedMovies } = require('../services/movieServices');
const { statusCode } = require('../utils/constants');

const getAllMoviesHandler = async (req, res, next) => {
  try {
    const { skip, limit, sortBy, sortOrder, name } = req.query;

    const options = {
      skip: parseInt(skip) || 0,
      limit: parseInt(limit) || 5,
      sort: sortBy || 'year',
      order: sortOrder || 'asc',
      name: name,
    };

    const movies = await getAllMovies(options);
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

const getAggregatedMoviesHandler = async (req, res, next) => {
  try {
    const movies = await getAggregatedMovies();
    res.status(statusCode.OK).send(movies);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllMoviesHandler, getMovieByIdHandler, getAggregatedMoviesHandler };