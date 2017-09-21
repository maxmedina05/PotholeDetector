const mongoose = require('mongoose');

const StreetDefectSchema = new mongoose.Schema({
  deviceName: String,
  xMean: Number,
  yMean: Number,
  zMean: Number,
  xStd: Number,
  yStd: Number,
  zStd: Number,
  latitude: Number,
  longitude: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('StreetDefect', StreetDefectSchema);
