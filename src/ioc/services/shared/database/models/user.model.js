import { Sequelize } from "sequelize";

import bcrypt from 'bcrypt-nodejs';

export class User extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init({
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			fullName: DataTypes.STRING,
			firstName: {
				type: DataTypes.STRING,
				allowNull: true
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: true
			},
			initials: {
				type: DataTypes.STRING,
				allowNull: true
			}
		}, { sequelize });
	}

	static hashPassword(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	}

	static generateFullName({ firstName, lastName }) {
		return firstName + ' ' + lastName;
	}

	static generateInitials({ firstName, lastName }) {
		return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
	}

	validPassword(password) {
		return bcrypt.compareSync(password, this.password);
	}
}
