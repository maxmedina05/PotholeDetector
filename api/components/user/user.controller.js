const User = require('./user.model');
const ResponseHandler = require('../helpers/response-handler');

function addUser(req, res) {
  let model = req.body;
  let newUser = User({
    firstName: model.firstName,
    lastName: model.lastName,
    email: model.email,
    password: model.password
  });
  newUser.save()
    .then(result => {
      res.status(201).json(ResponseHandler.generalResponse(true, 'created', user));
    })
    .catch(err => { throw ResponseHandler.errorResponse(err); });
}

function getUser(req, res) {
  let userId = req.params.userId;
  User.findOne({
      _id: userId
    }).exec()
    .then(user => {
      res.json(ResponseHandler.generalResponse(true, '', user));
    })
    .catch(err => { throw ResponseHandler.errorResponse(err); });
}

function getUsers(req, res) {
  User.find({}).exec()
    .then(function(users) {
      res.json(ResponseHandler.generalResponse(true, '', users));
    })
    .catch(err => { throw ResponseHandler.errorResponse(err); } );
}

function updateUser(req, res) {

}

function deleteUser(req, res) {
  let userId = req.params.userId;
  User.remove({
      _id: userId
    })
    .then(user => {
      res.json(ResponseHandler.generalResponse(true, 'deleted', user));
    })
    .catch(err => { throw ResponseHandler.errorResponse(err); });
}

module.exports = {
  addUser: addUser,
  getUser: getUser,
  getUsers: getUsers,
  updateUser: updateUser,
  deleteUser: deleteUser
};
