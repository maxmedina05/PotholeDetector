require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const PORT = process.env.PORT || 5099;
const mongoose = require('mongoose');

const app = express();
const swaggerSpecs = require('./api/swagger.config');
const userModule = require('./api/components/user/user.module');
const authModule = require('./api/components/authentication/auth.module');
const streetDefectModule = require('./api/components/street-defect/street-defect.module');

// Database configuration
mongoose.Promise = Promise;
mongoose.connect(process.env.DB_CONN_STR, {
  useMongoClient: true
});

// API configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Overriding methods for error handling
app.use(methodOverride());

// Setup API Documentation
app.use('/v1/api', express.static(__dirname + '/public/docs'));
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpecs);
});

// API routes
app.use('/auth', authModule);
app.use('/api/users', userModule);
app.use('/api/street-defects', streetDefectModule);

// Error Handler
app.use(function(err, req, res, next) {
  console.error(err.message);
  res.status(500).send(err);
});

app.listen(PORT, function() {
  console.log(`Pothole Detector API listening on port ${PORT}`);
});
