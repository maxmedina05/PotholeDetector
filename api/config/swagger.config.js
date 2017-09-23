const swaggerJSDoc = require('swagger-jsdoc');
const PORT = process.env.PORT || 5099;
const BASE_URL = process.env.BASE_URL || 'localhost';

// Swagger definition
const swaggerDefinition = {
  info: {
    description: 'This is the documentation for the Pothole Detector api.',
    version: '0.1.0',
    title: '0.1.0',
    contact: {
      contact: 'maxmedina05@gmail.com'
    }
  },
  securityDefinitions: {
    oauth: {
      type: 'oauth2',
      authorizationUrl: '/auth/google',
      flow: 'implicit'
    },
  },
  host: `${BASE_URL}:${PORT}`,
  basePath: '/'
};
const swaggerOptions = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./components/*/*.module.js']
};
const swaggerSpecs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpecs;
