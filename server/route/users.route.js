const express = require('express');
const users = require('../model/user.model');

const usersRoute = express.Router();

async function login(req, res) {
  try {
    const { username, password, role } = req.body;
    if (username && password && role) {
      const user = await users.find({ username: username, password: password, role: role });
      if (user.length > 0) {
        res.statusCode = 200;
        res.statusMessage = "USER_FOUND";
        res.send({ user: user[0]?.userDetails, message: "Login Success" });
      }
      else {
        res.statusCode = 404;
        res.statusMessage = "NOT_FOUND";
        res.send({ message: "Bad Credentials" });
      }
    } else {
      res.statusCode = 400;
      res.send({ message: 'BAD_REQUEST' })
    }
  }
  catch (e) {
    res.status(500).send({ message: e.message });
  }
}

usersRoute.post('/login', login);
module.exports = usersRoute;