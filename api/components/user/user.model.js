const mongoose                  = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now },
  createdBy: String,
  updated: Date,
  updatedBy: String
});

module.exports = mongoose.model('User', UserSchema);
