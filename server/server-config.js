/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var partials = require('express-partials');
// var flash = require('connect-flash');
// var session = require('express-session');

module.exports = function (app) {
  var env = app.get('env');
  var dirname = path.join(__dirname, '/../');
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(compression());
  app.use(methodOverride());
  app.use(cookieParser('secret'));
  // app.use(session({
  //   secret: 'keyboard cat',
  //   resave: false,
  //   saveUninitialized: true,
  //   cookie: { maxAge: 60000 }
  // }));
  // app.use(flash());
  app.use(cookieParser());

  if ('production' === env) {
    app.set('views', dirname + '/dist/views');
    console.log('production');
    app.use(express.static(path.join(dirname, 'dist')));
    app.use(express.static(path.join(dirname, 'public')));
    app.use(favicon(path.join(dirname, 'public', 'favicon.ico')));
    app.set('appPath', 'dist');
    // app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.set('views', dirname + '/app/views');
    // app.use(require('connect-livereload')());
    app.use(express.static(path.join(dirname, 'app')));
    app.use(express.static(path.join(dirname, 'public')));
    app.set('appPath', 'app');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
