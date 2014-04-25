// Server

// BASE SETUP
// --------------
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var path        = require('path');
var mongoose    = require('mongoose');
// Configure server to use bodyParser
// to get data from POST request
app.use(bodyParser());

mongoose.connect('mongodb://localhost/events');

var port = process.env.PORT || 3000;

var env = process.env.NODE_ENV || 'development';

if ('development' == app.get('env')){
  app.use(express.static(path.join(__dirname,'../client/.tmp')));
  app.use(express.static(path.join(__dirname,'../client/app')));
}
if ('production' == app.get('env')){
  app.use(express.static(__dirname + '/client/dist'));
}

// ROUTES
var router = require('./router')(app);

// Error Handling
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

app.listen(port);
module.exports = app;