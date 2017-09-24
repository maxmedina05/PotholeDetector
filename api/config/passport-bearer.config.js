const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;

const User = require('../components/user/user.model');

passport.use(new BearerStrategy(BearerStrategyCallback));

function BearerStrategyCallback (token, done) {
  console.log('BearerStrategyCallback');
  User.findOne({ token: token }, function(err, user) {
    if(err) {
      return done(err);
    }

    if(!user) {
      return done(null, false);
    }

    return done(null, user, { scope: 'all' });
  });
}
