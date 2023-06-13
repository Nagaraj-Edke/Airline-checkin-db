const express = require('express');
const flights = require('../model/flight.model');

const flightsRoute = express.Router();

async function getAllFlights(req, res) {
  try {
    const flightsData = await flights.find({});
    res.status(202).send([...flightsData]);
    // res.status(202).send({ data: flightsData });
  } catch (e) {
    res.status(500).send({ error: { message: e.message } });
  }
}

async function getFlightDataByID(req, res) {
  try {
    const flightData = await flights.find({ id: req.params.flightId });
    res.status(200).send(flightData[0]);
    // res.status(200).send({ data: flightData });
  } catch (e) {
    res.status(500).send({ error: { message: e.message } });
  }
}

async function updateFlightData(req, res) {
  try {
    await flights.updateOne({ id: req.params.flightId }, { $set: { ...req.body } });
    const flight = await flights.find({id: req.params.flightId});
    res.send(flight[0]);
    // if (update.matchedCount && update.modifiedCount) {
    //   res.send({ result: { code: 200, message: 'SUCCESS' } })
    // } else {
    //   res.send({ result: { code: 200, message: 'NOT_FOUND' } })
    // }
  } catch (e) {
    res.send({ result: { code: 500, message: 'FAILED' }, m: e.message })
  }
}

flightsRoute.get('', getAllFlights);
flightsRoute.get('/:flightId', getFlightDataByID);
flightsRoute.patch('/:flightId', updateFlightData);

module.exports = flightsRoute;
