const swaggerJSDoc = require('swagger-jsdoc');
const PORT = process.env.PORT || 5099;

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

module.exports = swaggerSpecs;
