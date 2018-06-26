const methodOverride = require("method-override");
const LocalStrategy = require("passport-local");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const passport = require("passport");
const express = require("express");
const db = require("./models");
const app = express();

//requiring routes
const campgroundRoutes = require("./routes/campgroundRoutes"),
      commentRoutes    = require("./routes/commentRoutes"),
      mainRoutes       = require("./routes/mainRoutes");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));
app.set("view engine", "ejs");
app.use(express.json());
require('./db')(app);

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  saveUninitialized: false,
  secret: "habba babba",
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(db.User.authenticate()));
passport.deserializeUser(db.User.deserializeUser());
passport.serializeUser(db.User.serializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;
  next();
});

app.use("/", mainRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

module.exports = app;
