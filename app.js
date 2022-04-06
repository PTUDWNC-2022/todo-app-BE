const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');

require('./components/authentication/passport');
require('./components/authentication/passportSSO');

const indexRouter = require('./routes/index');
const todosRouter = require('./components/todos');
const authenticationRouter = require('./components/authentication');
const cors = require('cors');

const allowList = [
	'http://localhost:3000',
	'https://todosapp-advancedwebdev.netlify.app',
];

const corsOptionsDelegate = (req, callback) => {
	let corsOptions;

	let isDomainAllowed = allowList.indexOf(req.header('Origin')) !== -1;

	if (isDomainAllowed) {
		// Enable CORS for this request
		corsOptions = { origin: true, credentials: true };
	} else {
		// Disable CORS for this request
		corsOptions = { origin: false };
	}
	callback(null, corsOptions);
};

const app = express();
app.use(cors(corsOptionsDelegate));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cookieSession({ name: 'session', keys: ['DevDuy'], maxAge: 24 * 60 * 60 * 100 }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', authenticationRouter);
app.use(
	'/todos',
	passport.authenticate('jwt', { session: false }),
	todosRouter
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
