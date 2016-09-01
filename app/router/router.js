var express = require('express');
var router = express.Router();

var Controllers = require('../controllers');

function Router(app, passport) {
  // user routes
  app.use('/tasks', Controllers.Tasks);

  //The 404 Route (ALWAYS Keep this as the last route)
  app.use(function(req, res) {
    res.status(404).send({ code: 404, success: false, key: true, message: 'Not found' });
  });
}

module.exports = Router;
