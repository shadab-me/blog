const express = require("express");
const User = require("../model/Admin");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");

// render login
router.get("/login", (req, res) => {
  if (req.session && req.session.userID) {
    res.redirect("/articles");
  } else {
    res.render("login");
  }
});

// login auth
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (err) next(err);
    if (!user) return res.redirect("/login");
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) next(err);
        if (result) {
          req.session.userID = user.id;
          res.redirect("/articles");
        } else {
          res.redirect("user/login");
        }
      });
    }
  });
});

// logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return next.log(err);
    res.redirect("/");
  });
  res.clearCookie("");
});

// rendering signup page
router.get("/signup", (req, res) => {
  if (req.session && req.session.userID) {
    res.redirect("/articles");
  } else {
    res.render("signup");
  }
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
    if (err) next(err);
    res.send(user, "deleted successfully..");
  });
});

// update user data
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate({ _id: id }, req.body, (err, user) => {
    if (err) next(err);
    res.send(user, "updated Successfully..");
  });
});

module.exports = router;
