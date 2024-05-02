const { getAllMovies, getMovieById } = require('../services/movieServices');

const getAllMoviesHandler = async (req, res, next) => {
  try {
    const movies = await getAllMovies();
    res.status(200).send(movies);
  } catch (err) {
    next(err);
  }
};

const getMovieByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const selectedMovie = await getMovieById(id);

    res.status(200).send(selectedMovie);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllMoviesHandler, getMovieByIdHandler };