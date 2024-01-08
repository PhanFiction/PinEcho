const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    minLength: 3,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 3,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    minLength: 4,
    required: true
  },
  profileImage: {
    path: {
      type: String,
    },
    publicId: {
      type: String,
    }
  },
  saves: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pin",
    }
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pin",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }
  ],
  pinLikes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pin",
      }
    ],
    default: [],
  },
  commentLikes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      }
    ],
    default: [],
  },
  followers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    default: [],
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
