const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comment = new Schema({
  email: {
    type: String,
  },
  comment: {
    type: String,
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Comment", comment);
