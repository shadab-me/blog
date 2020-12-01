const mongoose = require("mongoose");
const { model } = require("./article");
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

model.export = User;
