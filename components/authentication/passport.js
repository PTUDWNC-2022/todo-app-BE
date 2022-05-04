const { USERS } = require('../../models/collections');
const { ObjectId } = require('mongodb');
const { db } = require('../../models/db');

const JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
	new JwtStrategy(opts, async function (jwt_payload, done) {
		await db()
			.collection(USERS)
			.findOne({ _id: ObjectId(jwt_payload.userId) })
			.then(
				function (user) {
					if (user) {
						done(null, user);
					} else {
						done(null, false);
					}
				},
				function (err) {
					return done(err, false);
				}
			);
	})
);

module.exports = passport;
