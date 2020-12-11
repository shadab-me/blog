const express = require("express");
const router = express.Router();
const Comment = require("../model/comment");
const Article = require("../model/article.js");

router.get("/", async (req, res) => {
  await Article.find({}, (err, articles) => {
    if (err) console.log(err);
    res.render("articles", { articles });
  });
});

//localhost:3000/article/5fc6457fb6ad84ea2f2716fd/comment
router.post("/:id/comment", (req, res) => {
  const id = req.params.id;
  Comment.create(
    {
      email: req.body.email,
      comment: req.body.comment,
      articleId: id,
    },
    (err, comment) => {
      res.redirect(`/article/${id}`);
    }
  );
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) {
      console.log(err);
    }
    Comment.find({ articleId: id }, (err, comments) => {
      return err
        ? console.log(err)
        : res.render("article", { article, comments });
    });
  });
});

module.exports = router;
