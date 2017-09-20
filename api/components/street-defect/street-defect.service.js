const StreetDefect = require('./street-defect.model');

  function addStreetDefect(model) {
    var newStreetDefect = StreetDefect(model);
    return newStreetDefect.save();
  }

  function getStreetDefect(streetDefectId) {
    return StreetDefect.findOne({ _id: streetDefectId }).exec();
  }

  function getStreetDefects() {
    return StreetDefect.find({}).exec();
  }

  function updateStreetDefect(model) {

  }

  function deleteStreetDefect(streetDefectId) {
    return StreetDefect.remove({ _id: streetDefectId });
  }

module.exports = {
  addStreetDefect: addStreetDefect,
  getStreetDefect: getStreetDefect,
  getStreetDefects: getStreetDefects,
  updateStreetDefect: updateStreetDefect,
  deleteStreetDefect: deleteStreetDefect
}
