'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

// connect to MongoDB
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/userService');
mongoose.connect(keys.mongoURI, {useNewUrlParser : true});
// lấy kết nối mặc định
const db = mongoose.connection;
db.on('error', () => {
    console.error.bind(console, 'MongoDB connection error');
});
// make our db accessible to our router
app.use( (req, res, next) => {
    req.db = db;
    console.info.bind(console, 'MongoDB connection success');
    next();
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// make our db accessible to our router
// app.use( (req, res, next) => {
//     req.db = db;
//     console.info.bind(console, 'MongoDB connection success');
//     next();
// }, (req, res) => {
//     new User({
//         username : 'ngocsonqs',
//         email : 'ngocsonqs@gmail.com',
//         fullname : 'Luong Quy Ngoc',
//         age : 28,
//         location : 'Da Nang',
//         gender : 1
//     }).save();
// });

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
