/* global Promise */
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');

const PORT = process.env.PORT || 5099;

const app = express();
const swaggerConfig = require('./config/swagger.config');
const authModule = require('./components/authentication/auth.module');
const userModule = require('./components/user/user.module');
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
app.use(methodOverride());

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Setup API Documentation
app.use('/api/v1', express.static(__dirname + '/public/docs'));
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerConfig);
});

app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/login', function(req, res) {
  res.send('Please Login');
});

app.use(passport.initialize());
// API routes
const passportGoogleConfig = require('./config/passport-google.config');
app.use(authModule);
const passportConfig = require('./config/passport-bearer.config');

app.use('/api/users', userModule);
app.use('/api/street-defects', streetDefectModule);

// Handling 404 errors
app.get('*', function(req, res, next) {
  let err = new Error();
  err.status = 404;
  next(err);
});

// Error Handler
app.use(function(err, req, res, next) {
  if (err.status === 404) {
    return res.send('NOT FOUND!');
  }
  return res.status(500).send(err);
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

app.listen(PORT, function() {
  console.log(`Pothole Detector API listening on port ${PORT}`);
});
