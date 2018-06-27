const db = require("../models");

exports.new = (req, res) => {
  // find campground by id
  db.Campground.findById(req.params.id).populate('comments')
    .then(campground => res.render("comments/new", {campground: campground}))
    .catch(err => res.send(err))
};

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
          res.redirect('/campgrounds/' + campground._id);
        })
        .catch(err => console.log(err))
    })
    .catch(err => {
      console.log(err);
      res.redirect("/campgrounds");
    })
};

exports.getEditForm = (req, res) => {
  // find campground by id
  db.Comment.findById(req.params.commentId)
    .then(comment =>
      res.render("comments/edit", {campground_id: req.params.id, comment: comment}))
    .catch(err => console.log(err))
};

exports.deleteComment = (req, res) => {
  db.Comment.findByIdAndRemove(req.params.commentId)
    .then(() => {
      req.flash('success', 'Your comment was deleted!');
      res.redirect(req.get('referer'));
    })
    .catch(err => res.redirect("/campgrounds/" + req.params.id))
};

exports.editComment = (req, res) => {
  db.Comment.findByIdAndUpdate(req.params.commentId, req.body.comment)
    .then(() => {
      req.flash('success', 'Your comment was updated!');
      res.redirect("/campgrounds/" + req.params.id);
    })
    .catch(err => console.log(err))
};

module.exports = exports;