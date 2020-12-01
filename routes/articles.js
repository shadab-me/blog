const express = require("express");
let router = express.Router();
let Article = require("../model/user");

router.post("/article", (req, res, next) => {
  Article.create(req.body, (err, user) => {
    if (err) console.log(err);
    res.send(user);
  });
});
module.exports = router;
