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

router.get("/articles", async (req, res) => {
  await Article.find({}, (err, articles) => {
    if (err) console.log(err);
    res.render("articles", { articles });
  });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  Article.findById({ _id: id }, (err, article) => {
    return err ? console.log(err) : res.render("article", { article });
  });
});

module.exports = router;
