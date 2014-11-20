/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./server-config');
var port = process.env.PORT || 4568;

// Setup server
var app = express();
var server = require('http').createServer(app);
// require('./routes')(app);

config(app);
app.get('/', function (req, res) {
  console.log('index');
  res.render('index.ejs');
});

// Start server
server.listen(port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', port, app.get('env'));
});

// Expose app
exports = module.exports = app;
