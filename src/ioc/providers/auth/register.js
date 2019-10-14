import { Register } from '../../services/auth/regester/register';

module.exports = function(container) {
	container.service('Register', (container) => {
		return new Register(container.Database);
	});
};
