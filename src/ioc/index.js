const createContainer = require('./init');

const ioc = createContainer();

export const services = {
	database: ioc.Database,
	configManager: ioc.ConfigManager,
	passport: ioc.Passport,
	utils: ioc.Utils,

	userService: ioc.UserService
};
