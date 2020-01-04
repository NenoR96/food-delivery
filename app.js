var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var foodRouter = require('./routes/food-item');
var menuRouter = require('./routes/food-menu');
var adminRouter = require('./routes/admin');
var cartRouter = require('./routes/cart');

var cors = require('cors');

var app = express();


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/food-delivery";
mongoose.connect(url,{ useNewUrlParser: true });
//ako je povezivanje uspelo
mongoose.connection.on('connected',()=>{
    console.log('Connected to detabase');
});
//ako je doslo do greske
mongoose.connection.on('error',(err)=>{
    console.log('Error with connection to db: '+err);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/food-item', foodRouter);
app.use('/food-menu', menuRouter);
app.use('/cart', cartRouter);

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
