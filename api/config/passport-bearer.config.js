const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;

const User = require('../components/user/user.model');

passport.use(new BearerStrategy(BearerStrategyCallback));

function BearerStrategyCallback (token, done) {
  console.log(token);
  console.log('BearerStrategyCallback');

  return done(null, {}, { scope: 'read' });
}
