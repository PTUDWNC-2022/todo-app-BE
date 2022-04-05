const JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(
	new JwtStrategy(opts, function (jwt_payload, done) {
		done(null, jwt_payload);
	})
);

module.exports = passport;
