const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const ejs = require("ejs");
const path = require("path");
const { join } = require("path");

// middleware
const app = express();
app.use(morgan("dev"));
app.use(express.json());

// mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/blog", (err) => {
  if (err) console.log(err);
  else {
    console.log("Connected to data successfully...");
  }
});
// view
app.set("view engine", "ejs");
app.set("view", join.path(__dirname, "views"));

// routers
app.use("/user", require("./routes/users"));
app.use("/article", require("./routes/articles"));

app.listen(3000, function () {
  console.log("running on port 3k");
});
