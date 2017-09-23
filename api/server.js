/* global Promise */
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const PORT = process.env.PORT || 5099;

const app = express();
const swaggerConfig = require('./swagger.config');
const userModule = require('./components/user/user.module');
const authModule = require('./components/authentication/auth.module');
const streetDefectModule = require('./components/street-defect/street-defect.module');

// Database configuration
mongoose.Promise = Promise;
mongoose.connect(process.env.DB_CONN_STR, {
  useMongoClient: true
});

// API configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Setup logger
app.use(morgan('dev'));

// Overriding methods for error handling
app.use(methodOverride());

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

// Setup API Documentation
app.use('/v1/api', express.static(__dirname + '/public/docs'));
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerConfig);
});

// app.use(session({ secret: SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
// app.use(passport.session());

const passportConfig = require('./config/passport-bearer.config');

app.get('/', function(req, res) {
  res.send('hello world');
});

// API routes
app.use(authModule);
// app.use(require('./api/route.guard'));
app.use('/api/users', userModule);
app.use('/api/street-defects', streetDefectModule);

// Error Handler
app.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).send(err);
});

app.listen(PORT, function() {
  console.log(`Pothole Detector API listening on port ${PORT}`);
});
