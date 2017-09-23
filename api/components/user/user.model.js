const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema (
  {
    googleId: String,
    token: String,
    name: String,
    email: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);
