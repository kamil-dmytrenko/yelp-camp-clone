const mongoose = require('mongoose');

let port = process.env.PORT || 3000;
// let CONNECT_URI = 'mongodb://localhost/yelp-camp';
let CONNECT_URI = 'mongodb://admin:dbadmin1@ds121299.mlab.com:21299/movie-rest-app';

module.exports = (app) => {
  // Connect to database
  mongoose.connect(CONNECT_URI)
    .then(() => {
      //Start app only after connection is ready
      app.listen(port, () => {
        console.log(`Your application is running on http://localhost:${port}`);
      });
    })
    .catch(err => app.send(err));
};
