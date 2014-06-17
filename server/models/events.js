var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Local = new Schema({
  id: Number,
  name: String,
  snack: String,
  address: String,
  loc: {
    lon: Number,
    lat: Number
  },
  schedule: String,
  additional: String,
  phone: String,
  visits: Number
});

var EventSchema   = new Schema({
  name: String,
  region: String,
  location: String,
  date: Date,
  info: String,
  price: String,
  locals: [Local]
});

module.exports = mongoose.model('Event', EventSchema);