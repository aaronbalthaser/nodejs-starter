import { UserService } from '../../services/api/user/user';

module.exports = function(container) {
	container.service('UserService', (container) => {
		return new UserService(container.Database);
	});
};
