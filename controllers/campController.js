const db = require("../models");
const request = require("request");

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

exports.addOne = (req, res) => {
  // get data from form and add to campgrounds array
  let newCampground = new db.Campground({
    name : req.body.name,
    image : req.body.image,
    desc : req.body.description,
    author : {
      id: req.user._id,
      username:req.user.username
    },
  });
  // Create a new campground and save to DB
  db.Campground.create(newCampground)
    .then(() => res.redirect("/campgrounds"))
    .catch(err => console.log(err))
};

exports.getCreateForm = (req, res) => {
  res.render("campgrounds/new");
};

exports.showOne = (req, res) => {
  //find the campground with provided ID
  db.Campground.findById(req.params.id).populate("comments")
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

module.exports = exports;