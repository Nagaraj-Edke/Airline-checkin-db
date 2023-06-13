const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRoute = require('./route/users.route')
const flightsRoute = require('./route/flights.route');
const passengerRoute = require('./route/passenger.route');

const mongoAirlineDBURL = `mongodb+srv://Nag-test:N%40gMongoDB1@mongodb-cluster.ureisnz.mongodb.net/Airline?retryWrites=true&w=majority`;
mongoose.connect(mongoAirlineDBURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Mongo connected');
}).catch(err => {
  console.error('connection err', err)
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/', usersRoute);
app.use('/flights', flightsRoute);
app.use('/passengers', passengerRoute);

const port = 3000;
const server = app.listen(port, () => {
  var port = server.address().port;
  console.log(`server is running ${port}`);
});

