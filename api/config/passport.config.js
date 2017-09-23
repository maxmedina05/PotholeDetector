const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../components/user/user.model');

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('Passport Local Strategy');
    console.log('username: ', username);
    console.log('password: ', password);
    User.findOne({ email: username }, function (err, user) {
      if(err) {
        return done(err);
      }
      console.log('user: ', user);

      if(!user) {
        return done(null, false, { message: 'Incorrect username'});
      }

      if(user.password !== password) {
        return done(null, false, {message: 'Incorrect password'});
      }

      return done(null, user);
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
        done(err, user);
  });
});
