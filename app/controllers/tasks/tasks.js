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
	req.checkParams('id', 'Invalid id parameter').isMongoId().notEmpty();
	var errors = req.validationErrors();
  //validate errors
  if (errors) {
    return res
      .status(400)
      .send({
        success: 400,
        validationErrors: 'id is invalid',
        errors: errors
      });
  }
  Task.findOne({
    _id: req.params.id
	}, function (err, docs) {
		if(err || !docs){
			return res
      .status(400)
      .send({
        success: 400,
        validationErrors: 'id is invalid'
      });
		}
	  docs.remove(); //Remove all the documents that match!
	  return res.status(200).send(docs);
	});
};

/**
 * Update task
 * if succes all information will be updated
 */
Tasks.updateTask = function updateTask(req, res) {
	//validate params
	req.checkQuery('id', 'Invalid id parameter').isMongoId().notEmpty();
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

  var query = {
  	priority: req.query.priority,
  	dueDate: req.query.dueDate,
  	name: req.query.name
  };

  Task.update({
    _id: req.query.id
  }, query, function(err, taskData) {
    if (err){
      return res
        .status(500)
        .send({  
          success: 500,
          errors: err
        });
    }
    if(taskData.n === 0){
      return res
          .status(500)
          .send({
            success: 500,
          	errors: 'Task not found'
          });
    }
    return res.status(200).send(taskData);
  });
};