var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const userLogs = require('./middlewares/userLogs');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const methodOverride = require('method-override');
var app = express();
const auth = require('./middlewares/auth')
const apiUsersRouter = require('./routes/api/users')
const apiProductsRouter = require('./routes/api/products')
const apiCategoryRouter = require('./routes/api/category')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/***********middlewares***********/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/**********USERLOGS**************/
app.use(userLogs);
/***************************** */
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.static(path.resolve('public')));

app.use(session({
    secret: 'secret',
}));
app.use(auth)

app.use('/', indexRouter);
app.use('/', usersRouter);

//Llamo a la colección de api
app.use('/api/users',apiUsersRouter);
app.use('/api/products', apiProductsRouter);
app.use('/api/category', apiCategoryRouter);

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
