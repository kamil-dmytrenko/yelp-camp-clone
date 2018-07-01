const db = require("../models");

exports.create = (req, res) => {
  //lookup campground using ID
  db.Campground.findById(req.params.id)
    .then(campground => {
      db.Comment.create(req.body.comment)
        .then(comment => {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          campground.comments.push(comment);
          campground.save();
          console.log(comment);
          req.flash('success', 'Created a comment!');
          res.redirect(`/campgrounds/${campground._id}`);
        })
        .catch(err => req.flash('error', err.status))
    })
    .catch(err => {
      req.flash('error', err.status);
      res.redirect(`/campgrounds`);
    })
};

exports.deleteComment = (req, res) => {
  db.Comment.findByIdAndRemove(req.params.commentId)
    .then(() => {
      req.flash('success', 'Your comment was deleted!');
      res.redirect(req.get('referer'));
    })
    .catch(err => {
      req.flash('error', err.status);
      res.redirect("/campgrounds/" + req.params.id)
    })
};

module.exports = exports;