var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var html = require('html');
var config = require('./config');
var routes = require('./routes/index');
var mongo = require('mongodb');                     // TODO
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var app = express();

// view engine setup
app.engine('html', cons.underscore);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(favicon(path.join(__dirname, './public/favicon', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new mongoStore({
        url: config.get('mongoose:uri'),
        touchAfter: 32 * 3600
    }),
    resave: true,
    saveUnitialized: true
}));

app.use('/', routes);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * error handler
 * production error handler
 * no stacktraces leaked to user
 **/
app.use(function (err, req, res, next) {
    var status = err.status || 500;

    if (process.env.NODE_ENV === 'production') {
        res.status(status).send({error: err.message});
    } else {
        res.status(status).send({error: err.message + '\n' + err.stack});
    }
});

module.exports = app;


/*
 // development error handler
 // will print stacktrace
 if (app.get('env') === 'development') {
 app.use(function (err, req, res, next) {
 res.status(err.status || 500);
 res.render('error', {
 message: err.message,
 error: err
 });
 });
 }
 */
