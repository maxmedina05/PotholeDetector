const StreetDefect = require('./street-defect.model');
const ResponseHandler = require('../helpers/response-handler');

function addStreetDefect(req, res) {
  var newStreetDefect = StreetDefect(req.body);

  newStreetDefect.save()
    .then(result => {
      res.status(201).json(ResponseHandler.generalResponse(true, 'created', streetDefect));
    })
    .catch(err => { res.status(500).json(ResponseHandler.errorResponse(err)); });
}

function getStreetDefect(req, res) {

  StreetDefect.findOne({
      _id: req.params.objectId
    }).exec()
    .then(streetDefect => {
      res.json(ResponseHandler.generalResponse(true, '', streetDefect));
    })
    .catch(err => { res.status(500).json(ResponseHandler.errorResponse(err)); });
}

function getStreetDefects(req, res) {
  StreetDefect.find({}).exec()
    .then(function(streetDefects) {
      res.json(ResponseHandler.generalResponse(true, '', streetDefects));
    });
}

// TODO: Implement the update Street defect
function updateStreetDefect(req, res) {
  throw {
    message: 'Not implemented yet!'
  };
  // let query = {_id: req.params.objectId };
  // let update = {
  // };
  //
  // StreetDefect.findOneAndUpdate(query, update).exec()
  // .then(result => {
  //   res.json(ResponseHandler.generalResponse(true, '', result));
  // })
  // .catch(err => {
  //   res.status(500).json(ResponseHandler.errorResponse(err));
  // });
}

function deleteStreetDefect(req, res) {
  StreetDefect.remove({
      _id: req.params.objectId
    })
    .then(streetDefect => {
      res.json(ResponseHandler.generalResponse(true, 'deleted', streetDefect));
    })
    .catch(err => { res.status(500).json(ResponseHandler.errorResponse(err)); });
}

module.exports = {
  addStreetDefect: addStreetDefect,
  getStreetDefect: getStreetDefect,
  getStreetDefects: getStreetDefects,
  updateStreetDefect: updateStreetDefect,
  deleteStreetDefect: deleteStreetDefect
};
