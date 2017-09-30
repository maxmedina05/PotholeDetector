const jwt = require('jsonwebtoken');
const User = require('../user/user.model');
const ResponseHandler = require('../response-handler');

const SECRET = process.env.SECRET || 'MY_SUPER_SECRET_CODE';

function login(req, res) {
  let user = {
    email: req.body.email,
    password: req.body.password
  }

  User.findOne( { email: user.email }).exec()
    .then(userFound => {
      if (!userFound) {
        res.json({
          success: true,
          message: 'Login failed. User not found.',
        });
      } else if (user.password !== userFound.password) {
        res.json(ResponseHandler.errorResponse('Login failed. Wrong email or password.'));
      } else {

        let tokenData = {
          id: userFound._id,
          email: userFound.email
        };

        let token = jwt.sign(tokenData, SECRET, {
          expiresIn: '12h'
        });

        res.json({
          success: true,
          message: 'Login was successful',
          data: userFound,
          authorization: token
        });
      }

    })
    .catch(err => {
      console.log(err);
      res.status(500).json(ResponseHandler.errorResponse(err));
    });
}

function signup(req, res) {

}

function buildAuthorization(username, password) {
  let authorization = username + ':' + password;
  authorization = new Buffer(authorization).toString('base64');
  return authorization;
}

module.exports = {
  login: login,
  signup: signup
};
