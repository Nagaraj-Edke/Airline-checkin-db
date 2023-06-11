const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRoute = require('./route/users.route')
const flightsRoute = require('./route/flights.route');

const mongoAirlineDBURL = `mongodb+srv://Nag-test:N%40gMongoDB1@mongodb-cluster.ureisnz.mongodb.net/Airline?retryWrites=true&w=majority`;
mongoose.connect(mongoAirlineDBURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Mongo connected');
}).catch(err => {
  console.error('connection err', err)
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

process.env.PORT;

app.use('/', usersRoute);
app.use('/', flightsRoute);

const jsonServer = require('json-server');
const server1 = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();

server1.use(middlewares);
server1.use(jsonServer.bodyParser);
server1.use(router);

const [port1, port2] = [3000, 3001];
const server = app.listen(port1, () => {
  var port = server.address().port;
  console.log(`server is running ${port}`);
});
server1.listen(port2, () => {
  console.log('running', port2)
})
