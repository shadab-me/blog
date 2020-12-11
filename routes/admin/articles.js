const express = require("express");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("newArticle");
});

router.post("/", (req, res) => {
  Article.create(req.body, (err, article) => {
    if (err) console.log(err);
    res.send("Article Is Publish Successfully!!");
  });
});

module.exports = router;
