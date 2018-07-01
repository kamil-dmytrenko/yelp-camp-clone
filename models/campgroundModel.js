const mongoose = require('mongoose');

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
  name: String,
  price: String,
  lat: Number,
  lng: Number,
  location: String,
  description: String,
  facilities: [
    {
      type: String
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  images: [
    {
      type: String
    }
  ],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  }
});

module.exports = mongoose.model("Campground", campgroundSchema);