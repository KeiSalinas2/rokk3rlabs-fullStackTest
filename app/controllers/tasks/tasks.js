var Tasks = require('./../dir').Models.Tasks

var _ = require('lodash');
var moment = require('moment');
var Q = require('q');
var Task = require('./../../models/tasks');

var Tasks = module.exports = function() {
  return Tasks;
};

/**
 * Get tasks
 * return only neccessary fields
 */
Tasks.getTask = function getTask(req, res) {
	//
	var sort = '-_.id';
	if(req.query.sort)
		sort = req.query.sort;
	Task.findOne({}).sort(sort).exec(function(err, data){
		if (err) {
      return res
        .status(500)
        .send({
          status: 500,
          errors: err
        });
    }
	  return res.status(200).send(data);
	});
};

/**
 * Create task
 * return only neccessary fields
 */
Tasks.createTask = function getTask(req, res) {

	//validate params
  req.checkQuery('priority', 'Invalid priority parameter').isInt({ min: 1, max: 5 }).notEmpty();
  req.checkQuery('dueDate', 'Invalid dueDate parameter').notEmpty();
  req.checkQuery('name', 'Invalid name parameter').contains().notEmpty();

  var errors = req.validationErrors();
  //validate errors
  if (errors) {
    return res
      .status(500)
      .send({
        success: 500,
        errors: errors
      });
  }

  var newTask = new Task({
    name: req.query.name,
    dueDate: req.query.dueDate,
    priority: req.query.priority
  });

  newTask.save(function(err, data) {
    if (err) {
      return res
        .status(500)
        .send({
          status: 500,
          errors: err
        });
    }
    var tasksCreated = {
      id: data._id,
      name: data.name,
      dueDate: data.dueDate,
      priority: data.priority,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
    return res
      .status(201)
      .send(tasksCreated);
  });
};

/**
 * Delete task
 * return only neccessary fields
 */
Tasks.destroyTask = function getTask(req, res) {
  return res.status(200).send({
    success: true,
    message: 'Not avaliable 2'
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