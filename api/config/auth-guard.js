const GoogleAuth = require('google-auth-library');
const auth = new GoogleAuth;
const client = new auth.OAuth2(process.env.GOOOGLE_CLIENT_ID, '', '');

/* global Promise */

function validateToken(token) {
  return new Promise((resolve, reject) => {
    client.verifyIdToken(
      token,
      process.env.GOOGLE_CLIENT_ID,
      (err, login) => {
        if (err || !login) {
          console.log('error on validateToken');
          return reject(err);
        } else {
          let payload = login.getPayload();
          let exp = payload['exp'];
          let dateNow = new Date();
          return resolve(exp < dateNow.getTime());
        }
      }
    );

  });
}

module.exports = function(req, res, next) {
  if (req.headers['authorization']) {
    let header = req.headers['authorization'].split(' ');
    if (header.length == 2 && header[0] === 'Pothole') {
      let token = header[1];
      validateToken(token)
        .then(isValid => {
          if (isValid) {
            next();
          } else {
            res.status(400).json({
              success: false,
              message: 'Please Login in again!'
            });
          }
        })
        .catch(err => {
          res.status(400).json({
            success: false,
            message: err.message
          });
        })
    } else {
      res.status(400).json({
        success: false,
        message: 'Missing Sal or not the right sal'
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Missing authorization header'
    });
  }
}
