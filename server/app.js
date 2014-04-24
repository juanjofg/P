// Server

// BASE SETUP
// --------------
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var path        = require('path');

// Configure server to use bodyParser
// to get data from POST request
app.use(bodyParser());

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
var router = express.Router();

// test
router.get('/', function(req, res){
  //res.json({ message: 'Up and running'});
  res.sendfile('index.html');
});

// Register routes
app.use('/', router);

app.listen(port);