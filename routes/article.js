const express = require("express");
const router = express.Router();
const Comment = require("../model/comment");
const Article = require("../model/article.js");
const verifyUser = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "upload/" });
router.get("/new", (req, res) => {
  res.render("newArticle");
});

// Create Article
router.post("/", upload.single("featureImage"), (req, res) => {
  let ar = {
    title: req.body.title,
    content: req.body.content,
    img: req.body.featureImage,
  };
  console.log(req.body);
  Article.create(ar, (err, article) => {
    if (err) console.log(err);
    res.send(article);
  });
});

// Get Article
router.get("/", async (req, res) => {
  await Article.find({}, (err, articles) => {
    if (err) console.log(err);
    res.render("articles", { articles });
  });
});

//localhost:3000/article/5fc6457fb6ad84ea2f2716fd/comment
router.post("/:id/comment", verifyUser, (req, res) => {
  const id = req.params.id;
  Comment.create(
    {
      email: req.body.email,
      comment: req.body.comment,
      articleId: id,
    },
    (err, comment) => {
      if (err) console.log(err);
      Article.findByIdAndUpdate(
        id,
        { $push: { comments: comment.id } },
        { new: true },
        (err, article) => {
          console.log(comment);
          console.log(article);
          if (err) {
            console.log(err);
          } else {
            res.redirect(`/articles/${id}`);
          }
        }
      );
    }
  );
});

// Get Article by Id
router.get("/:id", (req, res) => {
  let id = req.params.id;
  Article.findById(id)
    .populate("comments")
    .exec((err, article) => {
      if (err) {
        console.log(err);
      } else {
        console.log(article);
        res.render("article", { article });
      }
    });
});

module.exports = router;
