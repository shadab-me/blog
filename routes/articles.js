const express = require("express");
let router = express.Router();

let Article = require("../model/article.js");

router.get("/new", (req, res) => {
  res.render("newArticle");
});

router.post("/", (req, res) => {
  Article.create(req.body, (err, article) => {
    if (err) console.log(err);
    res.send("Article Is Publish Successfully!!");
  });
});

router.get("/articles", (req, res) => {
  Article.find({}, (err, articles) => {
    return err ? console.log(err) : res.send(articles);
  });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  Article.findById({ _id: id }, (err, user) => {
    return err ? console.log(err) : res.send(user);
  });
});

module.exports = router;
