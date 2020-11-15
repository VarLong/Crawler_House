var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();

// use ejs and express layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

// use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// trust first proxy 
app.set('trust proxy', 1);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

// route our app
var router = require('./app/routes');
app.use('/', router);

// start the server
app.listen(port, function () {
    console.log('app started with port - ' + port);
});

process.on('uncaughtException', function (ex) {
    console.log("UncaughtException - " + ex);
});

