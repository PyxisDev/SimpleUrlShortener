var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var base58 = require('./base58.js');
var config = require('./config.js');
var models = require('./models/models.js');
var BSON = require('bson');
var validator = require('validator');

// Basic Settings
var port = 3000;
var baseUrl = 'http://localhost:' + port + '/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// create connection to mongodb
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

/**
 * Serve up homepage of UrlShortener
 * Edit Entry: URL, Text
 * Send to: /api/makeShort
 */
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
})

/**
 * Create and return a short url uses long url (or text if available)
 * Process:
 *      1. Create url uses Text
 *      2. if text is not available, next to 4
 *      3. if text is available, save url into mongodb, process ending
 *      4. create short url by shortening algorithm
 *      5. save url into mongodb, process ending
 */
app.post('/api/makeShort', function(req, res) {
     var longUrl = req.body.url;
     var alias = req.body.alias;

     console.log('long_url: ' + longUrl);
     console.log('alias: ' + alias);
     // find duplicate url from mongodb
     models.Url.findOne({long_url: longUrl}, function (err, doc){
        if (doc){
            shortUrl = baseUrl + base58.encode(doc._id);
            res.send({'shortUrl': shortUrl, 'longUrl': longUrl});
        } else {
            // not found, so create new one
            if (alias != "") {
                // create short url using alias
                createUseAlias(longUrl, alias, res);
                return;
            }
            
            // create short url using algorithm
            createShortUrl(longUrl, doc, res);
        }
    });
})

function createUseAlias(longUrl, alias, res) {
    console.log('use alias methods');
    models.Url.findOne({_id: alias}, function (err, doc) {
        if (!doc) {
           var newObj = new models.aliasUrl({ 
            "_id": alias, 
            "long_url": longUrl,
            "created_at": new Date(),
            "alias": alias });
            
            // TODO: Debugging
            newObj.save(function(err) {
                 if (err) return null;
                 shortUrl = baseUrl + alias;
                 res.send({'shortUrl': shortUrl, 'longUrl': longUrl});
            });
        } else {
            createShortUrl(longUrl, doc);
        }
    });
}

function createShortUrl(longUrl, doc, res) {
    var newUrl = models.Url({
        long_url: longUrl
    });

    newUrl.save(function(err) {
        if (err){
            console.log(err);
        }

        shortUrl = baseUrl + base58.encode(newUrl._id);
        res.send({'shortUrl': shortUrl, 'longUrl': longUrl});
    });
}

/**
 * Redirect to original Url
 */
app.get('/:shortUrl', function(req, res) {
    var url = req.params.shortUrl;
    console.log('url: ' + url);
    var isEncoded = validator.isEncoded(url);
    var id;

    if (isEncoded) {
        id = base58.decode(url);
    } else {
        id = url;
    }

    console.log('id: ' + id);
    models.Url.findOne({_id: id}, function (err, doc){
        if (doc) {
            res.redirect(doc.long_url);
        } else {
            res.redirect(baseUrl);
        }
  });
})

var server = app.listen(port, function() {
    console.log('Listening on port ' + port);
});