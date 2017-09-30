const mongoose = require('mongoose');
/**
 * @swagger
 * definition:
 *   StreetDefect:
 *     properties:
 *       userId:
 *         type: string
 *       latitude:
 *         type: number
 *       longitude:
 *         type: number
 */
const StreetDefectSchema = new mongoose.Schema({
  userId: String,
  xMean: Number,
  yMean: Number,
  zMean: Number,
  xStd: Number,
  yStd: Number,
  zStd: Number,
  location: {
    type: { type: String },
    coordinates: [Number]
  }
}, {
  timestamps: true
});

StreetDefectSchema.index({location: '2dsphere'});
module.exports = mongoose.model('StreetDefect', StreetDefectSchema);
