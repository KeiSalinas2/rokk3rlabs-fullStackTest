
var express = require('express'),
		app = express(),
    expressValidator = require('express-validator')
		port = 3001,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    config = require('./config/config');

//view
app.use(express.static(__dirname + '/build'));
//validator
app.use(expressValidator({
 customValidators: {
    isDate: function(value) {
      var userDate = new Date(value);
      if(isNaN(userDate))
        return false
      return true;
    }
 }
}));

//connection url
var uri = 'mongodb://' + config.db.host + '/' + config.db.database;

// execute connection
mongoose.connect(uri, { user: config.db.username, password: config.db.password }, function(err, res){
  if(err) throw err;
  console.log('Connected to db: ' + uri);
});

var Router = require('./app/router/router')(app);

//start server
var server = app.listen(port || 8080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Running on http://%s:%s ', host, port);
});