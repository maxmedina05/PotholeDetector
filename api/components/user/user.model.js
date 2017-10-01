const mongoose = require('mongoose');
/* global Promise */
/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       googleId:
 *         type: string
 *       name:
 *         type: string
 *       email:
 *         type: integer
 *       token:
 *         type: string
 */
const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  token: String,
  expire: Date
}, {
  timestamps: true
});

UserSchema.statics.findOrCreate = function(filters) {
  let User = this;
  return new Promise((resolve, reject) => {
    this.find(filters, function(err, results) {
      if (results.length == 0) {
        let newUser = new User();
        newUser.googleId = filters.googleId;
        newUser.save(function(err, doc) {
          if(err) {
            reject(err);
          }
          resolve(doc);
        });
      } else {
        resolve(results[0]);
      }
    });
  });

}

module.exports = mongoose.model('User', UserSchema);
