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
    default: null,
  },
  imgPath: {
    type: String,
    required: true,
  }
});

const Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;