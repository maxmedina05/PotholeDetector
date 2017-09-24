const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  token: String
}, {
  timestamps: true
});

UserSchema.statics.findOrCreate = function(filters, cb) {
  let User = this;
  this.find(filters, function(err, results) {
    if (results.length == 0) {
      let newUser = new User();
      newUser.googleId = filters.googleId;
      newUser.save(function(err, doc) {
        cb(err, doc);
      });
    } else {
      cb(err, results[0]);
    }
  })
}

module.exports = mongoose.model('User', UserSchema);
