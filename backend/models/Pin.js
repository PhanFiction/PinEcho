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
  category: [],
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
      ref: "Comments",
    }
  ],
  likes: {
    default: 0,
    type: Number,
  }
});

const Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;