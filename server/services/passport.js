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
        console.log('Profillllllllllle', profile)
        if (existingUser) {
          return done(null, existingUser);
        }

        const user = await new User({
          passportType: profile.provider,
          passportId: profile.id,
          avatar: profile.photos[0].value,
          firstName: profile.name?.givenName,
          lastName: profile.name?.familyName,
          emails: profile.emails.map(e => e.value),
          points: 0,
          rank: 0,
          address: 'Not Provided',
          password: 'wqu619ads89f1r1w19tr59hw1gf51sf9y8e11yu5y1t9wr0c0dsa1fd6a601g11910dag9tr04w94x1c40a9dscasd089448d004g4r904fads4059htr15g1r9wr77w9r8t782wg2123zc1vz1h43nrj14nhrb43',
        }).save();
        done(null, user);

      } catch (error) {
        console.log(error.message);
      }
    }
  )
);
