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

UserSchema.statics.findOrCreate = function(filter) {
  let User = this;
  return new Promise((resolve, reject) => {
    this.find(filter.googleId || filter, function(err, results) {
      if (results.length == 0) {
        let newUser = new User();
        newUser.googleId = filter.googleId;
        newUser.name = filter.name;
        newUser.email = filter.email;

        newUser.save(function(err, doc) {
          if (err) {
            reject(err);
          }
          resolve(doc);
        });
      } else {
        let curUser = results[0];
        curUser.name = (filter.name) ? filter.name : curUser.name;
        curUser.email = (filter.email) ? filter.email : curUser.email;
        curUser.save(function(err, doc) {
          if (err) {
            reject(err);
          }
          resolve(doc);
        });
      }
    });
  });

}

module.exports = mongoose.model('User', UserSchema);
