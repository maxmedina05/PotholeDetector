module.exports = function UserService(User) {

  function addUser(model) {
    var newUser = User({
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      password: model.password
    });

    return newUser.save(function(err) {
      if (err) throw err;

      return 1;
    });
  }

  function getUser() {

  }

  function getUsers() {
    return User.find({}).exec();
  }

  return {
    addUser: addUser,
    getUsers: getUsers
  };
};
