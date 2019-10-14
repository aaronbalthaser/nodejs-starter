import { ConfigManager } from '../../services/shared/config-manager/config-manager';

module.exports = function(container) {
	container.service('ConfigManager', () => new ConfigManager());
};
