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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: [],
  },
  imgPath: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    }
  ],
  likes: [],
});


/**
 * @title String
 * @description String
 * @altText string
 * @link string url
 * @category array
 * @imgPath string
 */
const Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;