import { JWTBearer } from '../../services/auth/jwt-bearer/jwt-bearer';

module.exports = function(container) {
	container.service('JWTBearer', (container) => {
		return new JWTBearer(container.Database);
	});
};
