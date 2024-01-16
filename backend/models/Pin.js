const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({ 
  title: {
    type: String,
    default: '',
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  altText: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
  imgPath: {
    path: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    }
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;