const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true
  },
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    minLength: 4,
    required: true
  }, 
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pin",
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    }
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "likes",
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
