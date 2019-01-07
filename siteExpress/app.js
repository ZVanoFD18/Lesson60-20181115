var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var favicon = require('serve-favicon');
//app.use(favicon(__dirname + '/public/images/favicon.png'));



var app = express();

app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.favicon(__dirname + '/public/images/favicon.png'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(require('serve-favicon')(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.json());
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // for parsing application/json
app.use(express.urlencoded({
    extended: false
}));
app.use(require('cookie-parser')());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var usersRouter = require('./app/users/router');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  let result ={
    success : false,
    message : err.message,
    error : req.app.get('env') === 'development' ? err : {}
  }; 

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.send(err.status || 500, result);
});
    
module.exports = app;
