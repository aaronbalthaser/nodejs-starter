import { Login } from '../../services/auth/login/login';

module.exports = function(container) {
	container.service('Login', (container) => {
		return new Login(container.Database, container.ConfigManager, container.Utils);
	});
};
