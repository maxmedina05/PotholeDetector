const User = require('../user/user.model');

function login(authUser) {

  User.findOne({ email: authUser.email })
    .then( userFound => {
        console.log(userFound);
    })
}

module.exports = {
  login: login
}
