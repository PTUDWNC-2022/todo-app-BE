const authenticationService = require('./authenticationService');

exports.register = async (req, res) => {
	try {
		const user = await authenticationService.register(
			req.body.email,
			req.body.password
		);
		res.status(201).json({ message: 'Registered successfully!' });
	} catch (error) {
		res.status(500).json({ errors: error.message });
	}
};

exports.login = async (req, res) => {
	try {
		const loginInfo = await authenticationService.login(
			req.body.email,
			req.body.password
		);
		res.status(200).json({
			user: { _id: loginInfo._id, email: loginInfo.email },
			accessToken: authenticationService.createJwt(loginInfo),
		});
	} catch (error) {
		res.status(401).json({ errors: error.message });
	}
};
