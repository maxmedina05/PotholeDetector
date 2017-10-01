const User = require('../user/user.model');
const GoogleAuth = require('google-auth-library');
const ResponseHandler = require('../response-handler');

const auth = new GoogleAuth;
const client = new auth.OAuth2(process.env.GOOGLE_CLIENT_ID, '', '');

function authenticate(req, res) {
  let token = req.body.token;
  client.verifyIdToken(
    token,
    process.env.GOOGLE_CLIENT_ID,
    (err, login) => {
      let payload = login.getPayload();
      let userId = payload['sub'];

      User.findOrCreate({ googleId: userId })
        .then(user => {
            user.name = payload['name'];
            user.email = payload['email'];
            user.expire = payload['expire'];
            return user.save()
        })
        .then(user => {
          let data = {
            user: user,
            token: token
          }
          res.json(ResponseHandler.authenticateResonse(data));
        })
        .catch(err => res.status(500).json(ResponseHandler.errorResponse(err)));
    }
  );
  // res.send('Not okay');
}

module.exports = {
  authenticate: authenticate
};
