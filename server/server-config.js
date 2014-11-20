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
  var dirname = path.join(__dirname, '/../');
  console.log('dirname', dirname);
  app.set('views', dirname + '/app/views');
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
    // app.use(favicon(path.join(dirname, 'public', 'favicon.ico')));
    app.use(express.static(path.join(dirname, '.tmp')));
    app.use(express.static(path.join(dirname, 'dist')));
    app.set('appPath', 'app');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    // app.use(express.static(path.join(dirname, '.tmp')));
    app.use(express.static(path.join(dirname, 'app')));
    app.set('appPath', 'app');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
