const express = require("express");
const User = require("../model/user");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/", (req, res) => {
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
