import { Utils } from '../../services/shared/utils/utils';

import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';

module.exports = function(container) {
	container.service('Utils', (container) => {
		return new Utils(
			container.ConfigManager,
			jwt, fs, path, bcrypt
		);
	});
};
