const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const ejs = require("ejs");
const path = require("path");
const expressSession = require("express-session");

// middleware
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  expressSession({
    secret: "Why I have to enter this random text",
    saveUninitialized: false,
  })
);

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
app.use("/articles", require("./routes/article"));
app.use("/user", require("./routes/user"));

app.listen(3000, function () {
  console.log("running on port 3k");
});
