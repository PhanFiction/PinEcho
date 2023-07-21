const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 5,
    required: true
  },
  name: {
    type: String,
    minLength: 5,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    minLength: 5,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
