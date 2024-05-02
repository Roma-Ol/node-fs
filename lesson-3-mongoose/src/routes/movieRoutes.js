const express = require('express');
const router = express.Router();
const { getAllMoviesHandler, getMovieByIdHandler } = require('../controllers/movieController');

router.get('/', getAllMoviesHandler);
router.get('/:id', getMovieByIdHandler);

module.exports = router;