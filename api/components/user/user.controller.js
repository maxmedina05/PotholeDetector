module.exports = function UserController(userService) {

  function addUser(req, res) {
    userService.addUser(req.body);
    res.json(req.body);
  }

  function getUser(req, res) {
  }

  function getUsers(req, res) {
    userService.getUsers()
      .then(function(users) {
        res.json(users);
      });
  }

  return {
    addUser: addUser,
    getUsers: getUsers
  };
};
