export class UserService {

	constructor(database) {
		this._database = database.db;
	}

	async updateUser(userId, update) {
		try {
			const updated = await this._database.User.update({
				firstName: update.firstName,
				lastName: update.lastName
			}, {
				where: { id: userId },
				returning: true
			});

			if (updated[0]) {
				return {
					success: true,
					user: updated[1][0]
				};
			} else {
				return {
					success: false,
					user: {}
				};
			}
		} catch (error) {

		}
	}
}
