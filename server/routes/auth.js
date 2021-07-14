import passport from 'passport';// the npm module not the config file
import { Router } from 'express';

const router = Router();

router.get('/google', (req, res, next) => {
  
  const {
    failRedirect,
    successRedirect
  } = req.query || {};


  const state =  Buffer.from(JSON.stringify({ failRedirect, successRedirect }), 'utf8').toString('base64')
  const authenticator = passport.authenticate(
    'google',
    {
      scope: ['profile', 'email'],
      state
    }
  );

  authenticator(req, res, next);
});

const passportRedirectCallback = (req, res, next) => {
  console.log({query: req.query})
  const {
    failRedirect,
    successRedirect
  } = JSON.parse(Buffer.from(req.query.state, 'base64').toString()) || {};
  
  const customCallback = (err, user, info) => {
    
    if (err) { 
      return next(err);
    }

    if (!user) { 
      return res.redirect(failRedirect); 
    }

    req.logIn(user, function(err) {
      if (err) { 
        return next(err); 
      }

      return res.redirect(successRedirect);
    });
  };

  passport.authenticate('google', customCallback)(req, res, next);
};

router.get(
  '/google/callback',
  passportRedirectCallback,
)

export default router;