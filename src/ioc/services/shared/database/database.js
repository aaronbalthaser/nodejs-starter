export class Database {

	constructor(configManager, Sequelize, User) {
		this._db  = {};
		this._config = configManager.config;
		this._sequelize = new Sequelize(
			this._config.DB_NAME,
			this._config.DB_USERNAME,
			this._config.DB_PASSWORD,
			this._config.DB_CONFIG
		);

		this._models = {
			User: User.init(this._sequelize, Sequelize)
		};

		this.init();
	}

	get db() {
		return this._db;
	}

	init() {
		Object.values(this._models)
			.filter(model => typeof model.associate === 'function')
			.forEach(model => model.associate(models));

		this._db  = {
			...this._models,
			sequelize: this._sequelize
		};
	}
}
