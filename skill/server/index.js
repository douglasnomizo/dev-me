var express = require('express');
var bodyParser = require('body-parser')
var request = require('request');

app = express();

require('./routes/router.js')(app);

app.listen(3000, function() {
  console.log('Listening on port 3000!');
});

