const express = require("express");
const router = express.Router();
const Article = require("../model/article");

router.get("/", (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) console.log(err);
    res.render("index", { articles });
  });
});

module.exports = router;
