const User = require('../user/user.model');

function login(authUser) {
  return new Promise(function(resolve, reject) {
    User.findOne({ email: authUser.email }).exec()
      .then( userFound => {
          if(authUser.password === userFound.password) {
            var answer = {
              authorization: buildAuthorization(userFound.email, userFound.password),
              data: userFound
            };
            resolve(answer);
          } else {
            reject({message: 'Login was not successful!'});
          }
      })
      .catch(err => reject(err));
  });
}

function signup(newUser) {

}

function buildAuthorization(username, password) {
  let authorization = username + ':' + password;
  authorization = new Buffer(authorization).toString('base64');
  return authorization;
}

module.exports = {
  login: login
}
