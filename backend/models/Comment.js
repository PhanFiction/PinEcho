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
  }
});

const Comments = mongoose.model('Comments', userSchema);

module.exports = Comments;
