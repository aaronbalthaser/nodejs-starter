'use strict';

module.exports = (express, services) => {
	const router = express.Router();

	router.route('/:id')
		.put(async (req, res) => {
			const { body } = req;
			const { id } = req.params;

			try {
				const response = await services.userService.updateUser(id, body);

				if (response.success) {
					return res.status(200).json({
						success: true,
						user: response.user
					});
				} else {
					return res.status(200).json({
						success: false,
						user: {}
					});
				}
			} catch (error) {

			}
		}
	);

	return router;
};
