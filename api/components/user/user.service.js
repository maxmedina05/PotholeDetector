module.exports = function UserService(User) {

  function addUser(model) {
    var newUser = User({
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      password: model.password
    });

    return newUser.save();
  }

  function getUser(userId) {
    return User.findOne({ _id: userId }).exec();
  }

  function getUsers() {
    return User.find({}).exec();
  }

  function updateUser(model) {

  }

  function deleteUser(userId) {
    return User.remove({ _id: userId });
  }

  return {
    addUser: addUser,
    getUser: getUser,
    getUsers: getUsers,
    updateUser: updateUser,
    deleteUser: deleteUser
  };
};
