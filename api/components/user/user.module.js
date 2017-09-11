const UserController                = require('./user.controller');

module.exports = function UserModule(app) {
  const userController = new UserController();

  app.get('/users', userController.getUsers);

};
