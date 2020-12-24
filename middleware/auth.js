const User = require("../model/Admin");

module.exports = {
  verifyUser: (req, res, next) => {
    if (req.session && req.session.userID) {
      next();
    } else {
      res.redirect("/user/login");
    }
  },
  currentLoggedUser: (req, res, next) => {
    if (req.session && req.session.userID) {
      const id = req.session.user;
      User.findById(id, { name: 1, email: 1 }, (err, user) => {
        if (err) return next(err);
        res.locals.user = user;
        next();
      });
    }
  },
};
