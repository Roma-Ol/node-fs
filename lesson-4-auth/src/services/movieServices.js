const { Movie } = require('../models');
const { verifyEntityExists } = require('../utils/verifyEntityExists');

const getAllMovies = async (options) => {
  const sortOptions = {};
  sortOptions[options.sort] = options.order === 'asc' ? 1 : -1;

  const queryOptions = {
    ...(options.name && { name: { $regex: options.name, $options: 'i' } }),
  };

  const totalItems = await Movie.countDocuments(queryOptions);
  const movies = await Movie.find(queryOptions)
    .skip(options.skip)
    .limit(options.limit)
    .sort(sortOptions);

  return {
    items: movies,
    meta: {
      skip: options.skip,
      limit: options.limit,
      total: totalItems,
    },
  };
};

const getMovieById = async (movieId) => {
  await verifyEntityExists({ _id: movieId }, Movie, 'Movie with this ID doesn\'t exist');
  const selectedMovie = await Movie.findById(movieId);

  return selectedMovie;
};

const getAggregatedMovies = async () => {
  const aggregatedMovies = await Movie.aggregate([
    {
      $match: {
        year: {
          $gt: 1994,
        },
      },
    },
    {
      $group: {
        _id: '$genre',
        averageRating: {
          $avg: '$rating',
        },
        movies: {
          $push: {
            name: '$name',
            year: '$year',
            rating: '$rating',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        groupName: '$_id',
        averageRating: 1,
        movies: 1,
      },
    },
  ]);

  return aggregatedMovies;
};

module.exports = { getAllMovies, getMovieById, getAggregatedMovies };