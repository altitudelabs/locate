/**
 * Express configuration
 */

'use strict';

var express = require('express');
// var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var partials = require('express-partials');

module.exports = function (app) {
  var env = app.get('env');
  console.log('__dirname', __dirname);
  app.set('views', __dirname + '/app/views');
  // app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(compression());
  app.use(methodOverride());
  app.use(cookieParser());

  if ('production' === env) {
    console.log('production');
    // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('appPath', __dirname + '/public');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(__dirname, '.tmp')));
    app.use(express.static(path.join(__dirname, 'client')));
    app.set('appPath', 'client');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
