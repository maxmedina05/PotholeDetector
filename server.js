require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 5099;
const mongoose = require('mongoose');

const app = express();
const userModule = require('./api/components/user/user.module');
const authModule = require('./api/components/authentication/auth.module');

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
app.use('/v1/api', express.static(__dirname + '/public/docs'));

// Swagger definition
const swaggerDefinition = {
  info: {
    "description": "This is the documentation for the Pothole Detector api.",
    "version": "0.1.0",
    "title": "Pothole Dector API",
    "contact": {
      "email": "maxmedina05@gmail.com"
    }
  },
  host: `localhost:${PORT}`,
  basePath: '/'
};
const swaggerOptions = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./api/components/*/*.module.js']
};
const swaggerSpecs = swaggerJSDoc(swaggerOptions);

// API routes
app.get('/', function(req, res) {
  res.send('Hello World');
});

app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpecs);
});

app.use('/api', userModule);
app.use('/auth', authModule);

app.listen(PORT, function() {
  console.log(`Pothole Detector API listening on port ${PORT}`);
});
