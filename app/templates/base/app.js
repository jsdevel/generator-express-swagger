var config = require('./config');
var express = require('express');
var path = require('path');
var resolve = path.resolve;
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swaggerize = require('swaggerize-express');
var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// allow CORS requests for any request in development
if (app.get('env') === 'development') {
  app.use(require('cors')());
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.use(swaggerize({
  api: require('./api'),
  docspath: '/api-docs',
  handlers: resolve(__dirname, 'api', 'handlers'),
}));

app.get('/favicon.ico', function(req, res) {
  res.end(); // ignore favicon requests
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
    title: 'error'
  });
});

module.exports = app;
