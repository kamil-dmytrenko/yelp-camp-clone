const express    = require('express'),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      path       = require('path'),
      engine     = require('ejs-layout'),
      Campground = require("./models/campground"),
      Comment    = require('./models/comment'),
      seedDB     = require("./seed"),
      app        = express();

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine.__express);

// Campground.create({
//     name: 'Mountain Goat\'s Rest',
//     image: 'https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-0.3.5&s=14948b1b6a8dd54164a0db522662e869&auto=format&fit=crop&w=1350&q=80',
//     description: 'Nunquam talem heuretes.Azureus, mirabilis plasmators foris contactus de magnum, audax equiso.Ionicis tormentos ire in vasa!'
// }, function(err, campground){
//     if (err) {
//         console.log("Error : " + err);
//     } else {
//         console.log("Created : " + campground);
//     }
// });

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

app.listen(3000, function () {
   console.log('Yelp Camp App running on port 3000');
});