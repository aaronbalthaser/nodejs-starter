'use strict';

module.exports = (express, services) => {
  let router = express.Router();

  router.post('/', (req, res, next) => {
		services.passport.instance.authenticate('login', (error, user, info) => {

      if (error) {
        return next(error);
      }

      if (!user) {
        return res.status(200).json({
          success: false,
          message: info.message
        });
      }

			if (user) {
				return res.status(200).json(user);
			}
    })(req, res, next);
  });

  return router;
};
