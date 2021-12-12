var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const jwtAuth = require('./lib/jwtAuthMiddleware');
const LoginController = require('./controllers/loginController');

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

app.locals.title = 'NodePop';

//Setup i18n

const i18n = require('./lib/i18nConfig');
app.use(i18n.init);

// Session Setup

app.use(
  session({
    name: 'nodepop-session',
    secret: process.env.USER_SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

console.log('Session', session);
/* API Routes */
const loginController = new LoginController();
app.use('/api/products', require('./routes/api/products'));
app.use('/api/login', loginController.postJWT);

/* APP Routes */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userPageRouter = require('./routes/user-page');
var changeLocaleRouter = require('./routes/change-locale');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user_page', userPageRouter);
app.use('/change-locale', changeLocaleRouter);
app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);

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
