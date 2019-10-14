export class JWTBearer {
	constructor(database) {
		this._database = database.db;
	}

	async validate(id, token, done) {
		try {
			const user = await this._database.User.findOne({
				where: { id: id }
			});

			if (user) {
				return done(null, user, token);
			} else {
				return done(null, false);
			}
		} catch (error) {

		}
	}
}
