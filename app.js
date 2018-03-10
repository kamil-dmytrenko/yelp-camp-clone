const express    = require('express'),
      bodyParser = require('body-parser'),
      app        = express(),
      mongoose   = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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

app.get('/campgrounds', function (req, res) {
    // get all campgrounds from db
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log("Error" + err);
        } else {
            res.render('index', {camps:allCampgrounds});
        }
    });

});

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

app.get('/campgrounds/new', function (req, res) {
    res.render('new');
});

app.get('/campgrounds/:id', function (req, res) {
    Campground.findById(req.params.id, function (err, foundCamp) {
        if (err) {
            console.log("Error" + err);
        } else {
            res.render('show', {campground: foundCamp});
        }
    });


});

app.listen(3000, function () {
   console.log('Yelp Camp App running on port 3000');
});