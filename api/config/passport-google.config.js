const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../components/user/user.model');

const GOOGLE_CONSUMER_KEY = '238180417493-rt7vceimdfi6n10do1kqmf04nle1fcjo.apps.googleusercontent.com';
const GOOGLE_CONSUMER_SECRET = '3rJ4-pmN3FVq5U4fwA1doNze';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CONSUMER_KEY,
  clientSecret: GOOGLE_CONSUMER_SECRET,
  callbackURL: 'http://localhost:5099/auth/google/callback'
}, strategyCallback));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

function strategyCallback(accessToken, refreshToken, profile, done) {
  console.log('Password Google Strategy');
  User.findOrCreate({
    googleId: profile.id
  }, function(err, result) {
    if (result) {
      result.token = accessToken;
      result.save(function(err, doc) {
        done(err, doc);
      });
    } else {
      done(err, result);
    }
  });
}

module.exports.isAccessTokenAlive = function(token, successCb, failedCb) {
  User.findOne({
    token: token
  }, function(err, user) {
    if (err) {
      throw err;
    }

    if (user) {
      successCb();
    } else {
      failedCb();
    }
  })
}
