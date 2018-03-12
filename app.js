const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const path       = require('path');
const engine     = require('ejs-layout');
const passport   = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const seedDB     = require("./seed");

//MODELS
const Campground = require("./models/campground");
const Comment    = require('./models/comment');
const User       = require('./models/user');

const app        = express();

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine.__express);

//PASSPORT CONGIGURATION
app.use(require('express-session')({
    secret: "i dont know how to cook",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//ROUTES

app.get('/', function (req, res) {
    res.render('landing');
});

//INDEX - show all campgrounds
app.get('/campgrounds', function (req, res) {
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
app.post('/campgrounds', function (req, res) {
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
app.get('/campgrounds/new', function (req, res) {
    res.render('campgrounds/new');
});

//SHOW ROUTE
app.get('/campgrounds/:id', function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCamp) {
        if (err) {
            console.log("Error" + err);
        } else {
            res.render('campgrounds/show', {campground: foundCamp});
        }
    });


});

//=====================================
//COMMENTS ROUTES
//=====================================

app.get('/campgrounds/:id/comments/new', function (req, res) {
    Campground.findById(req.params.id, function (err, foundCamp) {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground: foundCamp});
        }
    });
});

app.post('/campgrounds/:id/comments', function (req, res) {
    Campground.findById(req.params.id, function (err, foundCamp) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    foundCamp.comments.push(comment);
                    foundCamp.save();
                    res.redirect('/campgrounds/' + foundCamp._id);
                }
            })
        }
    });
});

//=====================================
//AUTH ROUTES
//=====================================

module.exports = app;