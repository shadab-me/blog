const express = require("express");
const User = require("../model/admin");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (err) res.render("login");
    else if (user.email) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          if (!req.session.id) {
            req.session.id = user.id;
          }
          res.redirect("/articles");
        } else {
          res.redirect("login");
        }
      });
    }
  });
});

module.exports = router;
