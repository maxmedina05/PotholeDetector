const UserController                = require('./user.controller');
const UserService                   = require('./user.service');
const User                          = require('./user.model');

module.exports = function UserModule(app) {
  const userService    = UserService(User);
  const userController = new UserController(userService);

  app.get('/users', userController.getUsers);
  app.post('/users', userController.addUser);
};
