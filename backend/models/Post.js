const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({ 
  title: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
  },
  altText: {
    type: String,
  },
  link: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;