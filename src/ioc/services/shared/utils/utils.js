export class Utils {
	constructor(configManager, jwt, fs, path, bcrypt) {
		this._configManager = configManager;
		this._jwt = jwt;
		this._fs = fs;
		this._path = path;
		this._bcrypt = bcrypt;
	}

	get configManager() {
		return this._configManager;
	}

	get jwt() {
		return this._jwt;
	}

	get fs() {
		return this._fs;
	}

	get path() {
		return this._path;
	}

	get bcrypt() {
		return this._bcrypt;
	}

	verify(target) {
    const segments = target.split(' ');
    const token = segments[1];
    const decoded = Utils.jwt.verify(token, this._configManager.getProperty('SESSION_SECRET'));
    const clientId = decoded['clientId'];

    return clientId === this._configManager.getProperty('CLIENT_ID');
	}
}
