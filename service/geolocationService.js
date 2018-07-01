const NodeGeocoder = require('node-geocoder');

let options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

module.exports = NodeGeocoder(options);
