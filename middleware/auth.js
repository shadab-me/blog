module.exports = {
  verifyUser: (req, res, next) => {
    if (req.session && req.session.userID) {
      next();
    } else {
      res.redirect("/user/login");
    }
  },
};
