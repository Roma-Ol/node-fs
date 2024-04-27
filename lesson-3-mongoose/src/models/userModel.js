const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  favorite_color: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
}, { timestamps: { createdAt: 'created_at' } });

const User = mongoose.model('User', userSchema);

module.exports = User;