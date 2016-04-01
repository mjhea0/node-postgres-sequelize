'use strict';
module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
    empCode: {
    	type: DataTypes.INTEGER,
    	primaryKey: true
    },
    empName: DataTypes.STRING,
    loginName: DataTypes.STRING,
    joinDate: DataTypes.STRING,
    empPlanLeave: DataTypes.DECIMAL,
    empUnplanLeave: DataTypes.DECIMAL,
    empFH: DataTypes.INTEGER,
    first_swipe: DataTypes.STRING,
    latest_swipe: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
    	  Employee.hasMany(models.LeaveTxn);
      }
    }
  });
  return Employee;
};