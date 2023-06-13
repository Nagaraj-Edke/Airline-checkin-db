const express = require('express');
const passengers = require('./../model/passenger.model');

async function addNewPassenger(req, res) {
  try {
    const newPassenger = req.body;
    const result = await passengers.insertMany(newPassenger);
    let message = '';
    if (result.length >= 1) {
      res.statusCode = 201;
      message = `Passenger has added to flight: ${result[0].flightId}`;
    } else {
      meesage = 'Failed to add new passenger.';
    }
    res.send({ message });

  } catch (e) {
    res.status(400).send(e.message);
  }

}

const passengerRoute = express.Router();

passengerRoute.post('/addNewUser', addNewPassenger);
passengerRoute.delete('/:id', async (req, res) => {

  try {
    const id = req.params.id;
    const resp = await passengers.deleteOne({ id: id });
    res.send(resp);
  }
  catch (e) {
    res.status(500).send(e.message)
  }
});
passengerRoute.get('', async (req, res) => {
  try {
    const flightId = req.query.flightId;
    let passengersData = [];
    let message = '';
    let code = 5000;
    if (flightId) {
      passengersData = await passengers.find({ flightId: flightId });
      message = `Fetched flight ${flightId} passengers data`;
      code = 2000;
    } else {
      passengersData = await passengers.find({});
      message = 'Fetched all passengers data';
      code = 3000;
    }
    res.send({ message, code, passengers: passengersData });
  }
  catch (e) {
    res.status(500).send(e.message);
  }
});

passengerRoute.get('/:id', async (req, res) => {
  try {
    const passengerId = req.params.id;
    let passengerData = [];
    let resObj = {
      passenger: {},
      message: 'Bad Request.'
    };
    res.statusCode = 400;
    if (passengerId) {
      passengerData = await passengers.find({ id: passengerId });
      if (passengerData.length >= 1) {
        resObj = {
          passenger: passengerData[0],
          message: 'Passenger details found.'
        }
        res.statusCode = 200;
      } else {
        res.statusCode = 404;
        resObj = {
          passenger: {},
          message: 'Passenger Id is not exist in DB.'
        };
      }
    }
    res.json(resObj);
  }
  catch (e) {
    res.status(500).send(e.message);
  }
});

passengerRoute.patch('/:id', async (req, res) => {
  try {
    const [payload, passengerId] = [req.body, req.params.id];
    const result = await passengers.updateOne({ id: passengerId }, payload);
    let message = '';
    if (result.matchedCount) {
      if (result.modifiedCount) {
        res.statusCode = 200;
        message = 'Successfully updated record!';
      } else {
        res.statusCode = 202;
        message = 'Record matched but not updated.';
      }
    } else {
      res.statusCode = 204;
      message = 'No record found';
    }
    res.send({ message });

  } catch (e) {
    res.status(500).send(e.message);
  }
});


// passengerRoute.delete('', async (req, res) => {
//   try {
//     const d = await passengers.deleteMany({});
//     res.send(d)
//   } catch (e) { res.status(400).send(e.message) }
// })

module.exports = passengerRoute;