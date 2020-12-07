const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = mongoose.model(
  "Comment",
  new Schema({
    email: {
      type: String,
    },
    comment: {
      type: String,
    },
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  })
);

module.exports = Comment;
