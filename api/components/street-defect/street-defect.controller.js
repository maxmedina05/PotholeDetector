const StreetDefect = require('./street-defect.model');
const ResponseHandler = require('../response-handler');
const MIN_DISTANCE = 10;

function addStreetDefect(req, res) {
  let lat = req.body.latitude;
  let lng = req.body.longitude;

  if (!lat || !lng) {
    let err = ResponseHandler.errorResponse('Missing latitude or longitude as parameters');
    err.status = 400;
    throw err;
  }
  // if(!req.body.userId) {
  //   let err = ResponseHandler.errorResponse('Missing userId as parameters');
  //   err.status = 400;
  //   throw err;
  // }
  //
  StreetDefect.update(
    {
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: MIN_DISTANCE
        }
      }
    },
    {
      $set: {
        updatedAt: new Date()
      }
    },
    {
        multi: true
    }
  ).exec()
    .then(result => {
      // console.log(result);
      if (result.nModified === 0) {
        let newStreetDefect = new StreetDefect({
          location: {
            coordinates: [lng, lat],
            type: 'Point'
          }
        });

        return newStreetDefect.save().then(result => {
          res.status(201).json(ResponseHandler.generalResponse('Street Defect', true, 'created', newStreetDefect));
        })
      } else {
        res.status(200).json(ResponseHandler.generalResponse('Street Defect', true, 'updated', {}));
      }
    })
    .catch(err => {
      res.status(500).json(ResponseHandler.errorResponse(err));
    })
}

function getStreetDefect(req, res) {
  StreetDefect.findOne({
    _id: req.params.objectId
  }).exec().then(streetDefect => {
    res.json(ResponseHandler.generalResponse(true, '', streetDefect));
  }).catch(err => {
    res.status(500).json(ResponseHandler.errorResponse(err));
  });
}

function getStreetDefects(req, res) {
  let lat = (req.query.lat) ? req.query.lat : 18.464950;
  let lng = (req.query.lng) ? req.query.lng : -69.931229;
  let radix = (req.query.radix) ? req.query.radix : 50;


  StreetDefect.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        $maxDistance: radix
      }
    }
  }).exec().then(function(streetDefects) {
    res.json(ResponseHandler.generalResponse('Street Defect', true, '', streetDefects));
  });
}

// TODO: Implement the update Street defect
function updateStreetDefect(req, res) {
  throw {
    message: 'Not implemented yet!'
  };
}

function deleteStreetDefect(req, res) {
  StreetDefect.remove({
    _id: req.params.objectId
  }).then(streetDefect => {
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
