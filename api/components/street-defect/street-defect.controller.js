const StreetDefect = require('./street-defect.model');
const ResponseHandler = require('../helpers/response-handler');

function addStreetDefect(req, res) {
    let streetDefect = req.body;
    let newStreetDefect = StreetDefect(streetDefect);
    newStreetDefect.save().then(result => {
        res.status(201).json(ResponseHandler.generalResponse('Street Defect', true, 'created', streetDefect));
    }).catch(err => {
        res.status(500).json(ResponseHandler.errorResponse(err));
    });
}

function getStreetDefect(req, res) {

    StreetDefect.findOne({_id: req.params.objectId}).exec().then(streetDefect => {
        res.json(ResponseHandler.generalResponse(true, '', streetDefect));
    }).catch(err => {
        res.status(500).json(ResponseHandler.errorResponse(err));
    });
}

function getStreetDefects(req, res) {
    let lat = req.query.lat;
    let lng = req.query.lng;
    let maxDistance = (req.query.maxDistance) ? req.query.maxDistance : 500;
    // console.log(req.query.lat);
    // console.log(req.query.lng);

    StreetDefect.find({
        location: {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                $maxDistance: maxDistance
            }
        }
    }).exec().then(function(streetDefects) {
        res.json(ResponseHandler.generalResponse('Street Defect', true, '', streetDefects));
    });
}

// TODO: Implement the update Street defect
function updateStreetDefect(req, res) {
    throw {message: 'Not implemented yet!'};
}

function deleteStreetDefect(req, res) {
    StreetDefect.remove({_id: req.params.objectId}).then(streetDefect => {
        res.json(ResponseHandler.generalResponse('Street Defect', true, 'deleted', streetDefect));
    }).catch(err => {
        res.status(500).json(ResponseHandler.errorResponse(err));
    });
}

module.exports = {
    addStreetDefect: addStreetDefect,
    getStreetDefect: getStreetDefect,
    getStreetDefects: getStreetDefects,
    updateStreetDefect: updateStreetDefect,
    deleteStreetDefect: deleteStreetDefect
};
