const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema (
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: String,
    admin: Boolean
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);
