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
    {id:1, name: 'Oviedo'},
    {id:2, name: 'Gijón'},
    {id:3, name: 'Avilés'},
    {id:4, name: 'Pola de Siero'},
    {id:5, name: 'Cangas del Narcea'},
    {id:6, name: 'León'}
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
// /p/api/event
router.get('/event/:id', function(req, res){
  Event.find({_id:req.params.id}, function(err, events){
    if (err) {
      res.send(err);
    }
    res.json(events);
  });
});
// /p/api/event/:local

module.exports = router;