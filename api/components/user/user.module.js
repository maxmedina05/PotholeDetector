const UserController = require('./user.controller');
const UserService = require('./user.service');
const User = require('./user.model');

module.exports = function UserModule(app) {
  const userService = UserService(User);
  const userController = new UserController(userService);

  app.route('/users')
    .get(userController.getUsers)
    .post(userController.addUser);

  app.route('/users/:userId')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser)
};
