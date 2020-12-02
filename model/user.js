const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let User = mongoose.model(
  "User",
  new Schema({
    name: String,
    email: {
      type: String,
      lowercase: true,
    },
  })
);

module.exports = User;
