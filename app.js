const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

//const user = require("./routes/users");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/blog", (err) => {
  if (err) console.log(err);
  else {
    console.log("Connected to data successfully...");
  }
});

app.use("/user", require("./routes/users"));

app.use("/article", require("./routes/articles"));
app.get("/", (req, res) => {
  res.send("Hey");
});
app.listen(3000, function () {
  console.log("running on port 3k");
});
