const userService = require('./user.service');

function addUser(req, res) {
    let user = req.body;

    userService.addUser(user)
        .then(result => {
            res.status(201).json({
                success: true,
                message: 'User was created successfully!'
            });
        })
        .catch(err => handleError(err, res));
}

function getUser(req, res) {
    let userId = req.params.userId;
    userService.getUser(userId)
        .then(user => {
            res.json({
                success: true,
                data: user
            });
        })
        .catch(err => handleError(err, res));
}

function getUsers(req, res) {
    userService.getUsers()
        .then(function(users) {
            res.json(users);
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
