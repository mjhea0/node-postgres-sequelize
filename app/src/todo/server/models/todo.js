'use strict';
module.exports = function(sequelize, DataTypes) {  
	var Todo = sequelize.define('Todo', {
		title : DataTypes.STRING,
		complete : {
			type : DataTypes.BOOLEAN,
			defaultValue : false
		},
		userCode : {
			type : DataTypes.INTEGER,
			references : {
				model : "Users",
				key : "userCode"
			}
		}
		}, 
		{
			classMethods : {
				associate : function(models) {
					models.Todo.belongsTo(models.User, {
						constraints : false,
						foreignKey: 'userCode',
						targetKey: 'userCode'
					});
				}
		}
	});
  return Todo;
};