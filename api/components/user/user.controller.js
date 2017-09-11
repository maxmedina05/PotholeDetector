module.exports = function UserController() {

  const users = [
    {id: 0, name: 'Max Medina'},
    {id: 1, name: 'Jose Perez'},
    {id: 2, name: 'Juan Perez'}
  ];

  function getUser(req, res) {

  }

  function getUsers(req, res) {
    res.json(users);
  }

  return {
    getUsers: getUsers
  };
};
