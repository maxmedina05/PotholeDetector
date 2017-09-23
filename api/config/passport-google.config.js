const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const User = require('../components/user/user.model');

const GOOGLE_CONSUMER_KEY = '238180417493-rt7vceimdfi6n10do1kqmf04nle1fcjo.apps.googleusercontent.com';
const GOOGLE_CONSUMER_SECRET = '3rJ4-pmN3FVq5U4fwA1doNze';

passport.use(new GoogleStrategy({
    consumerKey: GOOGLE_CONSUMER_KEY,
    consumerSecret: GOOGLE_CONSUMER_SECRET,
    callbackURL: 'http://localhost:5099/auth/google/callback'
  },
  function(token, tokenSecret, profile, done) {
    console.log('callback func');
    User.findOrCreate({
      googleId: profile.id
    }, function(err, user) {
      return done(err, user);
    });
  }
));
