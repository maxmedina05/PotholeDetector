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
  let objectId = req.params.objectId;
  User.findOne({
      _id: objectId
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
  let model = req.body;

  let objectId = req.params.objectId;
  User.findOne({ _id: objectId }).exec()
    .then( userFound => {

      userFound.firstName = model.firstName;
      userFound.lastName = model.lastName;
      userFound.email = model.email;

      return userFound.save();
    })
    .then( savedUser => {
      res.json(ResponseHandler.generalResponse(true, '', savedUser));
    })
    .catch(err => { throw ResponseHandler.errorResponse(err); } );
}

function deleteUser(req, res) {
  let objectId = req.params.objectId;
  User.remove({
      _id: objectId
    })
    .then(code => {
      if(code.result.n == 0) {
        res.json(ResponseHandler.alreadyDeletedResponse(true, code.result));
      }
      else {
        res.json(ResponseHandler.generalResponse(true, 'deleted', code));
      }
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
