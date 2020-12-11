const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let Schema = mongoose.Schema;
let user = new Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
  },
  password: {
    type: String,
  },
});

user.pre("save", function (next) {
  console.log(this.password);
  if (this.password) {
    this.password = bcrypt.hash(this.password, 12, (err, success) => {
      if (err) console.log(err);
      next();
    });
  }
});
let User = mongoose.model("User", user);
module.exports = User;
