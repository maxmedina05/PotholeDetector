const mongoose                  = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: String,
  created: Date,
  updated: Date,
  updatedBy: String,
});

module.exports = mongoose.model('User', UserSchema);
