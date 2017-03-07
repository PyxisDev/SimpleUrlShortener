var express = require('express');
var app = express();

/**
 * Serve up homepage of UrlShortener
 * Edit Entry: URL, Text
 * Send to: /api/makeShort
 */
app.get('/', function(req, res) {

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
})

/**
 * Redirect to original Url
 */
app.get('/:encoded_id', function(req, res) {
   
})

var server = app.listen(3000, function() {
    console.log('Listening on port 3000');
})