export class Login {
	constructor(database, configManager, utils) {
		this._database = database.db;
		this._configManager = configManager;
		this._utils = utils;
	}

	async login(email, password, done) {
		const cachedEmail = email;

		const user = await this._database.User.findOne({
			where: { 'email': email }
		});

		if (user) {
			if (!user.validPassword(password)) {
				return done(null, false, {
					email: cachedEmail,
					message: 'Email or password does not match.'
				});
			}

			const token = this._utils.jwt.sign(
				{ email: user.email, id: user.id },
				this._configManager.getProperty('SESSION_SECRET')
			);

			if (token) {
				done(null, {
					success: true,
					email: user.email,
					id: user.id,
					token: token
				});
			}
		} else {
			return done(null, false, {
				email: cachedEmail,
				message: `Email ${cachedEmail} does not exists.`
			});
		}
	}
}
