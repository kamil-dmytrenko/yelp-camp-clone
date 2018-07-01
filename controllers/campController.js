const uploadService = require('../service/imageUploadService');
const db = require("../models");

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

exports.getAll = (req, res) => {
  let noMatch = null;
  if(req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    // Get all campgrounds from DB
    db.Campground.find({name: regex})
      .then(allCampgrounds => {
          if(allCampgrounds.length < 1) noMatch = "We are sorry but apparently there is no such place available, please try again.";
          res.render("campgrounds",{campgrounds:allCampgrounds, noMatch: noMatch});
        })}
  else {
    // Get all campgrounds from DB
    db.Campground.find({})
      .then(allCampgrounds => res.render("campgrounds",{campgrounds:allCampgrounds, noMatch: noMatch}))
      .catch(err => console.log(err));
  }
};

exports.addOne = async (req, res) => {
  let newCampground = new db.Campground({
    name : req.body.name,
    images : [],
    description : req.body.description,
    facilities: req.body.facilities,
    author : {
      id: req.user._id,
      username:req.user.username
    },
  });
  uploadService.upload(req, res, newCampground)
};

exports.showOne = (req, res) => {
  //find the campground with provided ID
  db.Campground.findById(req.params.id).populate('comments')
    .then(foundCampground => res.render("campground", {campground: foundCampground}))
    .catch(err => console.log(err))
};

exports.updateOne = (req, res) => {
  let updateCampground = {
    name : req.body.name,
    description : req.body.description,
    facilities: req.body.facilities,
  };

  db.Campground.findByIdAndUpdate(req.params.id, {$set: updateCampground})
    .then(campground => {
      req.flash("success","Successfully Updated!");
      res.redirect(`/campgrounds/${campground._id}`);
    })
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("back");
    })

};

exports.deleteOne = (req, res) => {
  db.Campground.findByIdAndRemove(req.params.id)
    .then(() => {
      req.flash('error', 'Your camp was deleted!');
      res.redirect("/campgrounds")
    })
};

module.exports = exports;