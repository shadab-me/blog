const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let Schema = mongoose.Schema;
let user = new Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/*
user.pre("validate", function (next) {
  User.findOne(this.email, (err, result) => {
    if (result) {
      res.send("Email Is Already Register");
    }
  });
});
*/

user.pre("save", function (next) {
  if (this.password) {
    bcrypt.hash(this.password, 12, (err, hash) => {
      if (err) console.log(err);
      this.password = hash;
      next();
    });
  }
});

let User = mongoose.model("User", user);
module.exports = User;
