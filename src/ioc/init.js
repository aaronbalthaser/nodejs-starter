import { Container } from './container';

module.exports = function() {
	let container = new Container();

	// Shared
	require('./providers/shared/config-manager')(container);
	require('./providers/shared/database')(container);
	require('./providers/shared/utils')(container);

	// Auth
	require('./providers/auth/login')(container);
	require('./providers/auth/passport')(container);
	require('./providers/auth/register')(container);
	require('./providers/auth/jwt-bearer')(container);

	// API
	require('./providers/api/user')(container);

	return container;
};
