/* global Promise */
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
// const cors = require('cors')

const PORT = process.env.PORT || 5099;

const app = express();
const swaggerConfig = require('./config/swagger.config');
const authModule = require('./components/authentication/auth.module');
const authGuard = require('./config/auth-guard');

const userModule = require('./components/user/user.module');
const streetDefectModule = require('./components/street-defect/street-defect.module');

// Database configuration
mongoose.Promise = Promise;
mongoose.connect(process.env.DB_CONN_STR, {
  useMongoClient: true
});

// API configuration
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Enable CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Length');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, Authorization, Origin, X-Requested-With, Content-Type, Accept');

  if(req.method === 'OPTIONS') {
      return res.status(204).send();
  }
  next();
});

// app.use(cors());

// Setup API Documentation
app.use('/api/v1', express.static(__dirname + '/public/docs'));
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerConfig);
});

// API routes
app.use('/api/v1', authModule);
// app.use(authGuard);
app.use('/api/v1/users', authGuard, userModule);
app.use('/api/v1/street-defects', authGuard, streetDefectModule);

// Handling 404 errors
app.use(require('./components/error-handler/not-found'));
// Error Handler
app.use(require('./components/error-handler/error-handler'));

app.listen(PORT, function() {
  console.log(`Pothole Detector API listening on port ${PORT}`);
});
