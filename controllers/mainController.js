const passport = require("passport");
const db = require("../models");

exports.main = (req, res) => res.render("landing");

exports.signUp = (req, res) => {
  let newUser = new db.User({username: req.body.username});
  db.User.register(newUser, req.body.password)
    .then(() => {
      passport.authenticate("local")(req, res, function(){
        req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
        res.redirect("back");
      });
    })
    .catch(err => {
      req.flash("error", err.message);
      return res.render("back");
    })
};

exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "LOGGED YOU OUT!");
  res.redirect("/campgrounds");
};

module.exports = exports;