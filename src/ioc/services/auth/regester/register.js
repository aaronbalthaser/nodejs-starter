export class Register {

	constructor(database) {
		this._database = database.db;
	}

	async create(req, email, password, done) {
		const { body } = req;
		const { firstName, lastName } = req.body;

		const cachedEmail = email;

		this._database.User.findOrCreate({
			where: { email: email },
			defaults: {
				firstName: firstName,
				lastName: lastName,
				fullName: this._database.User.generateFullName(body),
				initials: this._database.User.generateInitials(body),
				password: this._database.User.hashPassword(password)
			}
		})
		.spread(function(user, created) {
			if (!created) {
				return done(null, false, {
					email: cachedEmail,
					message: `Email ${cachedEmail} already exists.`
				});
			}

			done(null, user);
		});
	}
}
