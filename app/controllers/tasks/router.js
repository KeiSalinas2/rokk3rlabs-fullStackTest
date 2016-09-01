var express = require('express');
var router = express.Router();
var Task = require('./tasks');

module.exports = router;


router.post('/create', Task.createTask);

router.get('/', Task.getTask);

router.get('/destroy/:id', Task.destroyTask);

router.post('/update', Task.updateTask);
