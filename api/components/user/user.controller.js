const userService = require('./user.service');

class GeneralResponse {
  constructor(success, verb, data) {
    this.success = success;
    this.message = (verb === '') ? '' : this.buildSuccessMessage(verb);
    this.data = data;
  }

  buildSuccessMessage(verb) {
    return `User was ${verb} successfully!`;
  }
}

function addUser(req, res) {
    let user = req.body;

    userService.addUser(user)
        .then(result => {
            res.status(201).json(new GeneralResponse(true, 'created', user));
        })
        .catch(err => handleError(err, res));
}

function getUser(req, res) {
    let userId = req.params.userId;
    userService.getUser(userId)
        .then(user => {
            res.json(new GeneralResponse(true, '', user));
        })
        .catch(err => handleError(err, res));
}

function getUsers(req, res) {
    userService.getUsers()
        .then(function(users) {
            res.json(new GeneralResponse(true, '', users));
        });
}

function updateUser(req, res) {

}

function deleteUser(req, res) {
    let userId = req.params.userId;
    userService.deleteUser(userId)
        .then(user => {
            res.json({
                success: true,
                data: user,
                message: 'User was deleted successfully!'
            });
        })
        .catch(err => handleError(err, res));
}

function handleError(err, res) {
    let error = {
        success: false,
        message: err.message || err
    };

    console.log(err.message || err);
    res.json(error);
}

module.exports = {
    addUser: addUser,
    getUser: getUser,
    getUsers: getUsers,
    updateUser: updateUser,
    deleteUser: deleteUser
};
