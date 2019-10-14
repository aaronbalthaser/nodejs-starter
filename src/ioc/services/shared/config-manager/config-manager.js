export class ConfigManager {

  constructor() {
    this._config = ConfigManager.init();
  }

  get config() {
    return this._config;
  }

  getProperty(key) {
    return this._config[key];
  }

  static init() {
		require('dotenv').config({
			path: __dirname + '/../../../../../.env'
		});

		const configurations = require('./config.json');
		const env = process.env.ENVIRONMENT;

		let config = {};

		for (let property in configurations) {
			if (configurations.hasOwnProperty(property)) {
				if (property === env) {
					config = configurations[property];
				}
			}
		}

		return config;
  }
}
