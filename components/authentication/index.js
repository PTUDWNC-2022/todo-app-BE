const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticationController = require('./authenticationController');

const errorRedirect = `${process.env.FE_HOST_DOMAIN}/users/login/error`;

router.post('/register', authenticationController.register);

router.post('/login', authenticationController.login);

router.get('/login/success', (req, res) => {
    if(req.user) {
        res.status(200).json({
            success: true,
            message: 'Login with Google successfully',
            user: req.user
        });
    }
});

router.get('/login/failed', (req, res) => {
    res.status(401).json({
       success: false,
       errors: 'Login with Google failed'
    });
});

router.get('/logout', (req, res) => {
   req.logout();
   res.redirect(`${process.env.FE_HOST_DOMAIN}/login/`);
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
    failureMessage: 'Cannot login to Google. Please try again later!',
    failureRedirect: errorRedirect,
    successRedirect: `${process.env.FE_HOST_DOMAIN}/login/`
}));

router.get('/facebook', passport.authenticate('facebook', { scope: ['profile', 'email'] }));

router.get('/facebook/callback', passport.authenticate('facebook', {
    failureMessage: 'Cannot login to Facebook. Please try again later!',
    failureRedirect: errorRedirect,
    successRedirect: `${process.env.FE_HOST_DOMAIN}/login/`
}));

module.exports = router;
