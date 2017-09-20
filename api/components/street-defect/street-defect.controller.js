const StreetDefect = require('./street-defect.model');

function addStreetDefect(req, res) {
  let model = req.body;

  var newStreetDefect = StreetDefect(model);
  newStreetDefect.save()
    .then(result => {
      res.status(201).json(ResponseHandler.generalResponse(true, 'created', streetDefect));
    })
    .catch(err => { throw ResponseHandler.errorResponse(err); });
}

function getStreetDefect(req, res) {
  let streetDefectId = req.params.streetDefectId;

  StreetDefect.findOne({
      _id: streetDefectId
    }).exec()
    .then(streetDefect => {
      res.json(ResponseHandler.generalResponse(true, '', streetDefect));
    })
    .catch(err => { throw ResponseHandler.errorResponse(err); });
}

function getStreetDefects(req, res) {
  StreetDefect.find({}).exec()
    .then(function(streetDefects) {
      res.json(ResponseHandler.generalResponse(true, '', streetDefects));
    });
}

function updateStreetDefect(req, res) {

}

function deleteStreetDefect(req, res) {
  let streetDefectId = req.params.streetDefectId;
  StreetDefect.remove({
      _id: streetDefectId
    })
    .then(streetDefect => {
      res.json(ResponseHandler.generalResponse(true, 'deleted', streetDefect));
    })
    .catch(err => { throw ResponseHandler.errorResponse(err); });
}

module.exports = {
  addStreetDefect: addStreetDefect,
  getStreetDefect: getStreetDefect,
  getStreetDefects: getStreetDefects,
  updateStreetDefect: updateStreetDefect,
  deleteStreetDefect: deleteStreetDefect
};
