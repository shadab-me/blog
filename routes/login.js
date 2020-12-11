const express = require("express");
const User = require("../model/admin");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (err) res.render("login");
    else if (user.email) {
      bcrypt.compare(password, user.password, (err, result) => {
        console.log(result);
        if (result) {
          res.redirect("/articles");
        } else {
          res.redirect("login");
        }
      });
    }
  });
});

module.exports = router;
