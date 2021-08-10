const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

import User from '../models/User';
// const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ passportType: profile.provider, passportId: profile.id });
        console.log('Profillllllllllle',profile)
        if (existingUser) {
          return done(null, existingUser);
        }
      
        const user = await new User({
          passportType: profile.provider,
          passportId: profile.id,
          firstName: profile.name?.givenName,
          lastName: profile.name?.familyName,
          emails: profile.emails.map(e => e.value),
        }).save();
        done(null, user);

      } catch (error) {
        console.log(error.message);
      }
    }
  )
);
