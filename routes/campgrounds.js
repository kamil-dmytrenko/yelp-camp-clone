var express = require('express');
var router = express.Router();
var Campground = require('../models/campground'),
    middleware = require('../middleware');

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
router.post('/', middleware.isLoggedIn, function (req, res) {
    var campName = req.body.campName;
    var campImg = req.body.campImg;
    var campPrice = req.body.campPrice;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var campDescription = req.body.campDescription;
    var newCamp = {
        name: campName,
        image: campImg,
        price: campPrice,
        description: campDescription,
        author: author
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
router.get('/new', middleware.isLoggedIn, function (req, res) {
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

//EDIT ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCamp) {
        res.render('campgrounds/edit', {campground: foundCamp});
    });
});

//UPDATE ROUTE
router.put('/:id',middleware.checkCampgroundOwnership ,function (req, res) {
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCamp) {
       if (err) {
           console.log(err)
       } else {
           res.redirect('/campgrounds/' + req.params.id);
       }
   })
});

//DELETE ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/campgrounds');
        }
    })
});

module.exports = router;