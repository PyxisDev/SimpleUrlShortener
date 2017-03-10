var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counter = mongoose.model('counter', CounterSchema);
var Url = mongoose.model('Url', urlSchema);

var urlSchema = new Schema({
  _id: String,
  long_url: String,
  created_at: Date
});

module.exports = Url;