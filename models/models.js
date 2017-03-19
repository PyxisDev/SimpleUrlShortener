var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MongoClient = require('mongodb').MongoClient;

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counter = mongoose.model('counter', CounterSchema);

var urlSchema = new Schema({
  _id: String,
  long_url: String,
  created_at: Date,
  alias: String
});

var aliasUrlScheme = new Schema({
  _id: String,
  long_url: String,
  created_at: Date,
  alias: String
});

urlSchema.pre('save', function(next){
  var doc = this;
  
  counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
      if (error)
          return next(error);
      doc._id = counter.seq;
      doc.created_at = new Date();
      next();
  });
});

var Url = mongoose.model('url', urlSchema);
var aliasUrl = mongoose.model('aliasUrl', aliasUrlScheme);

module.exports = {
    Url,
    aliasUrl
}