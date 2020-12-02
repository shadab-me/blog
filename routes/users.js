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

module.exports = router;
