var express = require('express');
var router = express.Router();
var Task = require('./tasks');

module.exports = router;


router.get('/', Task.getTask);

router.put('/', Task.updateTask);
