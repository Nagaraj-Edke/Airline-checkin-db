
const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  id: String,
  flightId: String,
  firstName: String,
  lasrName: String,
  gender: String,
  dob: String,
  passport: String,
  seatNumber: String,
  address: String,
  checkedIn: { type: Boolean, required: true },
  withInfants: Boolean,
  wheelChairRequired: Boolean,
  selectedMeals: String,
  specialMeals: Boolean,
  selectedAncillaryServices: [],
  selectedShopItems: []
});

const passengers = mongoose.model('passengers', passengerSchema);
module.exports = passengers;