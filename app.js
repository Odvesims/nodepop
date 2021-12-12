var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

//Init DB connection
require('./lib/database_connection');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Setup i18n

const i18n = require('./lib/i18nConfig');
app.use(i18n.init);

app.locals.title = 'NodePop';

app.use('/api/products', require('./routes/api/products'));
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  // Send JSON if request was sent to API
  if (req.url.includes('/api')) {
    res.status(err.status || 500);
    res.json({ status: 500, error: err.message });
  } else {
    res.render('error');
  }
});

module.exports = app;
