const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Article = mongoose.model(
  "Article",
  new Schema({
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  })
);

module.exports = Article;
