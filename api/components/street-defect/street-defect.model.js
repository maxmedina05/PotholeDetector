const mongoose                  = require('mongoose');

const StreetDefectSchema = new mongoose.Schema({
  deviceName: String,
  latitude: Number,
  longitude: Number,
  createdAt: { type: Date, default: Date.now },
  createdBy: String,
  updatedAt: Date,
  updatedBy: String
});

module.exports = mongoose.model('StreetDefect', StreetDefectSchema);
