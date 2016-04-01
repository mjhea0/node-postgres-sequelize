'use strict';
module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		userCode : {
			type : DataTypes.INTEGER, 
			primaryKey: true,
			unique: true
		},
		email : {
			type : DataTypes.STRING
		}
	},
	{
	    classMethods: {
	        associate: function(models) {
	        	models.User.hasMany(models.Todo, {
					constraints : false,
					foreignKey: 'userCode',
					targetKey: 'userCode'
				});
	        }
	    }
	});
  return User;
};