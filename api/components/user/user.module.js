const express                                 = require('express');
const router                                  = express.Router();
const userController                          = require('./user.controller');

router.route('/')
  .get(userController.getUsers)
  .post(userController.addUser);

router.route('/:userId')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
