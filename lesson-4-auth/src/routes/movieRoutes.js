const express = require('express');
const router = express.Router();
const { getAllMoviesHandler, getMovieByIdHandler, getAggregatedMoviesHandler } = require('../controllers/movieController');

router.get('/all', getAllMoviesHandler);
router.get('/aggregated', getAggregatedMoviesHandler);
router.get('/:id', getMovieByIdHandler);


module.exports = router;