// Document js
const sequelize = require('../database/index')
const { Model, DataTypes } = require('sequelize');

class Usuarios extends Model {}
Usuarios.init(
	{
		username: {
			type: DataTypes.STRING,
			unique: true
		},
		photo: {
			type: DataTypes.TEXT,
			defaultValue: 'perfil1.png'
		},
		password: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING, //zip
			unique: true
		},
		isEmailVerified: {
			type: DataTypes.BOOLEAN
		},
		token: {
			type: DataTypes.TEXT('long')
		},
		ipAddress: {
			type: DataTypes.STRING 
		},
		zip: {
			type: DataTypes.STRING
		},
		country: {
			type: DataTypes.STRING
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: 1
		},
		number_of_reports: {
			// max 50
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	}, {
	sequelize,
	modelName: 'Usuarios'
})

// async function UPDATE_TABLE(){
// 	    await Usuarios.sync();
// }
// UPDATE_TABLE()

module.exports = Usuarios