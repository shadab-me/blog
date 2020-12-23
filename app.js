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
    resave: true,
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

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(4000, function () {
  console.log("running on port 3k");
});
