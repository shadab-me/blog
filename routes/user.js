const express = require("express");
const User = require("../model/admin");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");

// render login
router.get("/login", (req, res) => {
  res.render("login");
});

// login auth
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (err) res.render("login");
    else if (user.email) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) console.log(err);
        else if (result) {
          req.session.userID = user.id;
          res.redirect("/article");
        } else {
          res.redirect("login");
        }
      });
    }
  });
});

// rendering signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});
//http://localhost:3000/user/signup

// signup
router.post("/signup", (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.send(user);
    }
  });
});

// reading all user data
router.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    if (err) console.log(err);
    else {
      res.send(users);
    }
  });
});

// reading only one user
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  User.findOne({ _id: id }, (err, user) => {
    if (err) console.log(err);
    else {
      res.send(user);
    }
  });
});

// delete user
router.delete("/:id", (req, res) => {
  User.findByIdAndDelete({ _id: id }, (err, user) => {
    res.send(user, "deleted successfully..");
  });
});

// update user data
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate({ _id: id }, req.body, (err, user) => {
    res.send(user, "Updated Successfully..");
  });
});
module.exports = router;