const authService = require('./auth.service');

function login(req, res) {
  let user = {
    email: req.body.email,
    password: req.body.password
  }

  authService.login(user)
    // .then(authUser => {
    //   res.json({
    //     success: true,
    //     message: 'Login was successful'
    //   });
    // })
    // .catch(err => handleError(err, res));
}

function signup(req, res) {

}

function handleError(err, res) {
    let error = {
        success: false,
        message: err.message || err
    };

    console.log(err.message || err);
    res.json(error);
}

module.exports = {
  login: login,
  signup: signup
};
