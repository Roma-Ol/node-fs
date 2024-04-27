const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const movieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;