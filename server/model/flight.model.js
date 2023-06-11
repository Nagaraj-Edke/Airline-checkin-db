const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  id: String,
  ancillaryServiceList: [],
  arrivalDateAndTime: String,
  date: String,
  depatureDateAndTime: String,
  destination: String,
  duration: String,
  flightName: String,
  format: String,
  from: String,
  logo: String,
  shopItemList: [],
  source: String,
  specialMeals: [],
  time: String,
  to: String
});

const flights = mongoose.model('flights', flightSchema);
module.exports = flights;