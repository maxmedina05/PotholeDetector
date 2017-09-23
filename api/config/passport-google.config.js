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
  process.nextTick(function() {
    User.findOne({ googleId: profile.id}, function(err, user) {

      if(err){
        return done(err);
      }

      if(user) {
        return done(null, user);
      } else {
        let newUser = new User();
        newUser.googleId = profile.id;
        newUser.token = accessToken;
        newUser.name = profile.displayName;
        newUser.email = profile.emails[0].value;

        newUser.save(function(err) {
          if(err) {
            throw err;
          }
          return done(null, newUser);
        });
      }

    });
  });
}
