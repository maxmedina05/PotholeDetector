const mongoose = require('mongoose');

const StreetDefectSchema = new mongoose.Schema({
  deviceName: String,
  latitude: Number,
  longitude: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('StreetDefect', StreetDefectSchema);
