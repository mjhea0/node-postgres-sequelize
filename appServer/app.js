// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');


// *** routes *** //
var todoRoutes = require('./../app/src/todo/server/routes/index.js');
var conferenceRoutes = require('./../app/src/roomBooking/server/routes/index.js');
var leaveRoutes = require('./../app/src/leaveManagement/server/routes/index.js');

// *** express instance *** //
var app = express();


// *** view engine *** //
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


// *** static directory *** //
app.set('views', path.join(__dirname, '../app/src/leaveManagement/Kj_Leave_Application/views'));
//app.set('views', path.join(__dirname, '../app/src/roomBooking/client/views'));
//app.set('views', path.join(__dirname, '../app/src/todo/client/'));


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../app/src/leaveManagement/Kj_Leave_Application')));
//app.use(express.static(path.join(__dirname, '../app/src/roomBooking/client')));
//app.use(express.static(path.join(__dirname, '../app/src/todo/client')));
app.use('/bower_components', express.static(path.join(__dirname, '../bower_components')));


// *** main routes *** //
//app.use('/todo', todoRoutes);
//app.use('/conference', conferenceRoutes);
app.use('/leave', leaveRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;
