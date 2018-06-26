const mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.Promise = Promise;

module.exports.User = require("./userModel");
module.exports.Comment = require("./commentModel");
module.exports.Campground = require("./campgroundModel");
