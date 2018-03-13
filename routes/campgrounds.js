var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

//INDEX - show all campgrounds
router.get('/', function (req, res) {
    // get all campgrounds from db
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log("Error" + err);
        } else {
            res.render('campgrounds/index', {camps:allCampgrounds});
        }
    });
});

//CREATE - add new campground to DB
router.post('/', function (req, res) {
    var campName = req.body.campName;
    var campImg = req.body.campImg;
    var campDescription = req.body.campDescription;
    var newCamp = {
        name: campName,
        image: campImg,
        description: campDescription
    };

    Campground.create(newCamp, function (err, newCamp) {
        if (err) {
            console.log("Error" + err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

//NEW - show form to create new campground
router.get('/new', function (req, res) {
    res.render('campgrounds/new');
});

//SHOW ROUTE
router.get('/:id', function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCamp) {
        if (err) {
            console.log("Error" + err);
        } else {
            res.render('campgrounds/show', {campground: foundCamp});
        }
    });
});

module.exports = router;