const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const ejs = require("ejs");
const path = require("path");

// middleware

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// mongoose connection
mongoose.connect(
  "mongodb://127.0.0.1:27017/blog",
  { useNewUrlParser: true, useUnifiedTopology: true },

  (err) => {
    if (err) console.log(err);
    else {
      console.log("Connected to data successfully...");
    }
  }
);

// view
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routers
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/users"));
app.use("/articles", require("./routes/articles"));
app.use("/admin", require("./routes/admin/articles"));

app.listen(3000, function () {
  console.log("running on port 3k");
});
