export class Passport {

	constructor(
			configManager,
			utils,
			passport,
			JWTBearerStrategy,
			LocalStrategy,
			JWTBearer,
			Register,
			Login
		) {

		this._config = configManager.config;
		this._instance = passport;
		this._jwt = utils.jwt;

		this._JWTBearerStrategy = JWTBearerStrategy;
		this._LocalStrategy = LocalStrategy;

		this._JWTBearer = JWTBearer;
		this._Register = Register;
		this._Login = Login;

		this.init();
	}

	get instance() {
		return this._instance;
	}

	createLoginStrategy() {
		const options = {
			usernameField: 'email',
			passwordField: 'password'
		};

		this._instance.use('login', new this._LocalStrategy(options,
			(email, password, done) => {
				return this._Login.login(email, password, done);
			})
		);
	}

	createRegistrationStrategy() {
		const options = {
			usernameField: 'email',
			passReqToCallback : true
		};

		this._instance.use('register', new this._LocalStrategy(options,
			(req, email, password, done) => {
				return this._Register.create(req, email, password, done);
			})
		);
	}

	createJWTBearerStrategy() {
		this._instance.use('jwt-bearer', new this._JWTBearerStrategy(this._config.SESSION_SECRET,
			(token, done) => {
				let decoded = this._jwt.verify(token, this._config.SESSION_SECRET);

				return this._JWTBearer.validate(decoded.id, token, done);
			})
		);
	}

	init() {
		this.createJWTBearerStrategy();
		this.createRegistrationStrategy();
		this.createLoginStrategy();
	}
}
