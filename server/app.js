// Server

// BASE SETUP
// --------------
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var path        = require('path');
var mongoose    = require('mongoose');
var MONGO = {
  options: {
    server: {
      auto_reconnect: true,
      socketOptions: {
        connectTimeoutMS: 3600000,
        keepAlive: 3600000,
        socketTimetoutMS: 3600000
      }
    }
  }
};
// Configure server to use bodyParser
// to get data from POST request
app.use(bodyParser());

//mongoose.connect('mongodb://localhost/events', MONGO.options);
mongoose.connect('mongodb://juanjofg:p7tinto@oceanic.mongohq.com:10038/events', MONGO.options);

var port = process.env.PORT || 3000;

var env = process.env.NODE_ENV || 'development';

if ('development' == app.get('env')){
  app.use(express.static(path.join(__dirname,'../client/.tmp')));
  app.use(express.static(path.join(__dirname,'../client/app')));
}
if ('production' == app.get('env')){
  app.use(express.static(__dirname + '/dist'));
}

// ROUTES
var router = require('./router')(app);

// Error Handling
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

app.listen(port);
module.exports = app;