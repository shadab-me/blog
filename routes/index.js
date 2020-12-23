const express = require("express");
const router = express.Router();
const Article = require("../model/Article");
const User = require("../model/Admin");

router.get("/", (req, res) => {
  console.log(req.session.userID);

  Article.find({}, (err, articles) => {
    User.findById(req.session.userID, (err, user) => {
      if (err) console.log(err);
      res.render("index", { articles, user });
    });
  });
});

module.exports = router;
