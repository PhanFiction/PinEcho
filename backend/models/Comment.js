const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
  pin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pin",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
