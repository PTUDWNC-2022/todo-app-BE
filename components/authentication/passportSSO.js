const passport = require("passport");
const {Strategy: GoogleStrategy} = require("passport-google-oauth20");
const {Strategy: FacebookStrategy} = require("passport-facebook");
const authenticationService = require('./authenticationService');

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (req, _, accessToken, profile, done) => {
        const defaultUser = {
            fullName: profile.displayName,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
            socialId: profile.id
        };

        try {
            const user = await authenticationService.loginWithSocial(defaultUser.email);
            const accessToken = await authenticationService.createJwt(user);
            done(null, { mongodbUser: user, socialUser: {...defaultUser, accessToken} });
        } catch (e) {
            done(null, e);
        }
    }
));

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    async (req, accessToken, refreshToken, profile, done) => {
        const defaultUser = {
            fullName: profile.displayName,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
            socialId: profile.id
        };

        try {
            const user = await authenticationService.loginWithSocial(defaultUser.email);
            done(null, { mongodbUser: user, socialUser: defaultUser });
        } catch (e) {
            done(null, e);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    done(null, user);
});

module.exports = passport;