var express = require('express');
var router = express.Router();
var Event = require('../../models/events');
// /p/api
router.get('/', function(req, res){
  res.json({
    message: 'PintxApp API',
    version: '0.1',
    date: '25/04/2014'
  });
});
// /p/api/cities
router.get('/cities', function(req, res){
  //La lista de ciudades no se recupera de BD (de momento)  
  var cities = [
    {id:6, name: 'Madrid'},
    {id:1, name: 'Oviedo'},
    {id:2, name: 'Gijón'},
    {id:3, name: 'Aller'},
    {id:4, name: 'Valencia de Don Juan'},
    {id:5, name: 'Villaviciosa'}
  ];
  res.json({cities: cities});
});
// /p/api/events
router.get('/events', function(req, res){
  Event.find(function(err, events){
    if (err) {
      res.send(err);
    }
    res.json(events);
  });
});
// /p/api/events/:city
router.get('/events/:city', function(req, res){
  Event.find({location:req.params.city}, {_id:1, name: 1}, function(err, events){
    if (err) {
      res.send(err);
    }
    res.json(events);
  });
});
// /p/api/event/:name
router.get('/event/:name', function(req, res){
  Event.find({name:req.params.name}, function(err, events){
    if (err) {
      res.send(err);
    }
    res.json(events);
  });
});
// /p/api/event/:name/:local
router.get('/event/:name/:local', function(req, res){
  var localId = parseInt(req.params.local, 10);
  Event.find({name:req.params.name}, {"locals": {"$elemMatch":{"id":localId}}}, function(err, events){
    if (err) {
      res.send(err);
    }
    res.json(events[0]);
  });
});
// /p/api/visit/:name/:local
// POST para sumar visitas a cada local
router.post('/visit/:name/:local', function(req, res){
  var localId = parseInt(req.params.local, 10),
      options = {upsert: true, safe: true};
  Event.update({name : req.params.name , "locals.id" : localId }, {$inc : {"locals.$.visits" : 1} }, options, function (err, num, raw){
    if (err) {
      res.json(err);
    } else {
      res.send(200);
    }
  });
});
// /p/api/vote/:name/:local
// POST para sumar votos a cada local
router.post('/vote/:name/:local', function(req, res){
  var localId = parseInt(req.params.local, 10),
      options = {upsert: true, safe: true};
  Event.update({name : req.params.name , "locals.id" : localId }, {$inc : {"locals.$.votes" : 1} }, options, function (err, num, raw){
    if (err) {
      res.json(err);
    } else {
      res.send(200);
    }
  });
});
module.exports = router;