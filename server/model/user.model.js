const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  userDetails: {
    firstName: String,
    lastName: String,
    name: String,
    email: String,
    provider: String
  }
});

const user = mongoose.model("users", schema);
module.exports = user;