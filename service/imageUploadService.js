const cloudinary = require('cloudinary');
const db = require("../models");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

exports.upload = (req, res, campground) => {
  req.files.forEach(async (file) => {
    await cloudinary.uploader.upload(file.path,
      {secure: true, transformation: [{ width: 150, height: 150, crop: 'thumb'}]})
      .then(result => {
        campground.images.push(result.secure_url);
        if (req.files.length === campground.images.length) {
          // Create a new campground and save to DB
          db.Campground.create(campground)
            .then(() => res.redirect("/campgrounds"))
            .catch(err => console.log(err))
        }
      })
  })
};

module.exports = exports;
