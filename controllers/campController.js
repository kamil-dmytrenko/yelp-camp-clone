const uploadService = require('../service/imageUploadService');
const request = require("request");
const db = require("../models");



exports.getAll = (req, res) => {
  db.Campground.find({})
    .then(allCampgrounds => {
      request('https://maps.googleapis.com/maps/api/geocode/json?address=sardine%20lake%20ca&key=AIzaSyBtHyZ049G_pjzIXDKsJJB5zMohfN67llM', function (error, response, body) {
        if (!error && response.statusCode === 200) {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});}
      });
    })
    .catch(err => console.log(err));
};

exports.addOne = async (req, res) => {

  let newCampground = new db.Campground({
    name : req.body.name,
    images : [],
    description : req.body.description,
    author : {
      id: req.user._id,
      username:req.user.username
    },
  });
  uploadService.upload(req, res, newCampground);


};

exports.getCreateForm = (req, res) => {
  res.render("campgrounds/new");
};

exports.showOne = (req, res) => {
  //find the campground with provided ID
  db.Campground.findById(req.params.id).populate('comments')
    .then(foundCampground => res.render("campgrounds/show", {campground: foundCampground}))
    .catch(err => console.log(err))
};

exports.updateOne = (req, res) => {
  let newData = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.desc
  };

  db.Campground.findByIdAndUpdate(req.params.id, {$set: newData})
    .then(campground => {
      req.flash("success","Successfully Updated!");
      res.redirect("/campgrounds/" + campground._id);
    })
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("back");
    })
};

exports.getEditForm = (req, res) => {
  //find the campground with provided ID
  db.Campground.findById(req.params.id)
    .then(foundCampground => res.render("campgrounds/edit", {campground: foundCampground}))
    .catch(err => console.log(err))
};

exports.deleteOne = (req, res) => {
  db.Campground.findByIdAndRemove(req.params.id)
    .then(() => {
      req.flash('success', 'Your camp was deleted!');
      res.redirect("/campgrounds")
    })
};

module.exports = exports;