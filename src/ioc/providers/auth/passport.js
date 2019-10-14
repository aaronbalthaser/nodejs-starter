import { Passport } from '../../services/auth/passport/passport';

import passport from 'passport';

import JWTBearerStrategyModule from 'passport-http-bearer';
import LocalStrategyModule from 'passport-local';

module.exports = function(container) {
	const JWTBearerStrategy = JWTBearerStrategyModule.Strategy;
	const LocalStrategy = LocalStrategyModule.Strategy;

	container.service('Passport', (container) => {
		return new Passport(
			container.ConfigManager,
			container.Utils,
			passport,
			// Services & Strategies
			JWTBearerStrategy,
			LocalStrategy,
			container.JWTBearer,
			container.Register,
			container.Login
		);
	});
};
