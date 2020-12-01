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
      type: mongoose.Types.ObjectId,
    },
  })
);

module.exports = Article;
