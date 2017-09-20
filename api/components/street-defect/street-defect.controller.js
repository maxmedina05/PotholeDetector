const streetDefectService = require('./street-defect.service');

class GeneralResponse {
  constructor(success, verb, data) {
    this.success = success;
    this.message = (verb === '') ? '' : this.buildSuccessMessage(verb);
    this.data = data;
  }

  buildSuccessMessage(verb) {
    return `Street Defect was ${verb} successfully!`;
  }
}

function addStreetDefect(req, res) {
    let streetDefect = req.body;

    streetDefectService.addStreetDefect(streetDefect)
        .then(result => {
            res.status(201).json(new GeneralResponse(true, 'created', streetDefect));
        })
        .catch(err => handleError(err, res));
}

function getStreetDefect(req, res) {
    let streetDefectId = req.params.streetDefectId;
    streetDefectService.getStreetDefect(streetDefectId)
        .then(streetDefect => {
            res.json(new GeneralResponse(true, '', streetDefect));
        })
        .catch(err => handleError(err, res));
}

function getStreetDefects(req, res) {
    streetDefectService.getStreetDefects()
        .then(function(streetDefects) {
            res.json(new GeneralResponse(true, '', streetDefects));
        });
}

function updateStreetDefect(req, res) {

}

function deleteStreetDefect(req, res) {
    let streetDefectId = req.params.streetDefectId;
    streetDefectService.deleteStreetDefect(streetDefectId)
        .then(streetDefect => {
          res.json(new GeneralResponse(true, 'deleted', streetDefect));
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
    addStreetDefect: addStreetDefect,
    getStreetDefect: getStreetDefect,
    getStreetDefects: getStreetDefects,
    updateStreetDefect: updateStreetDefect,
    deleteStreetDefect: deleteStreetDefect
};
