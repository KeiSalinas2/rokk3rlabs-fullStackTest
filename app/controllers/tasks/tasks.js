var Tasks = require('./../dir').Models.Tasks

var _ = require('lodash');
var moment = require('moment');
var Q = require('q');

var Tasks = module.exports = function() {
  return Tasks;
};

/**
 * Get profile from logged user
 * return only neccessary fields
 */
Tasks.getTask = function getTask(req, res) {
  return res.status(200).send({
    success: true,
    message: 'Not avaliable'
  });
};

/**
 * Update profile from current logged user
 * if succes all information will be updated
 */
Tasks.updateTask = function updateTask(req, res) {
  return res.status(200).send({
    success: true,
    message: 'Not avaliable'
  });
};