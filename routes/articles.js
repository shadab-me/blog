const express = require("express");
let router = express.Router();

let Article = require("../model/article.js");

router.post("/", (req, res) => {
  Article.create(req.body, (err, user) => {
    if (err) console.log(err);
    res.send(user);
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
