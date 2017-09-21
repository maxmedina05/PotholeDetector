const User = require('../user/user.model');
const ResponseHandler = require('../helpers/response-handler');

function login(req, res) {
  let user = {
    email: req.body.email,
    password: req.body.password
  }

  User.findOne({
      email: user.email
    }).exec()
    .then(userFound => {
      if (user.password === userFound.password) {
        res.json({
          success: true,
          message: 'Login was successful',
          data: userFound,
          authorization: buildAuthorization(userFound.email, userFound.password)
        });
      } else {
        res.json(ResponseHandler.errorResponse('Login was not successful'));
      }

    })
    .catch(err => {
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
