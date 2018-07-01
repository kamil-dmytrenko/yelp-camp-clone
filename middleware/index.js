const db = require("../models");

module.exports = {
  isLoggedIn: (req, res, next) => {
    if(req.isAuthenticated()){
      return next();
    }
    req.flash("error", "You must be signed in to do that!");
    res.redirect("back");
  },

  checkUserCampground: (req, res, next) => {
    if(req.isAuthenticated()){
        db.Campground.findById(req.params.id)
          .then(campground => {
            if(campground.author.id.equals(req.user._id)){
              next();
            }
            else {
              req.flash("error", "You don't have permission to do that!");
              res.redirect("back");
            }
          })
    }
    else {
      req.flash("error", "You need to be signed in to do that!");
      res.redirect("back");
    }
  },

  checkUserComment: (req, res, next) => {
    if(req.isAuthenticated()){
      db.Comment.findById(req.params.commentId)
        .then(comment => {
          if(comment.author.id.equals(req.user._id)){
            next();
          }
          else {
            req.flash("error", "You don't have permission to do that!");
            res.redirect("back");
          }
        })
    } else {
      req.flash("error", "You need to be signed in to do that!");
      res.redirect("back");
    }
  }
};