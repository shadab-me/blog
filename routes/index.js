const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { name: [5, 2, 6, 7] });
});

module.exports = router;
