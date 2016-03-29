'use strict';
module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
    empCode: DataTypes.STRING,
    empName: DataTypes.STRING,
    loginName: DataTypes.STRING,
    joinDate: DataTypes.DATEONLY,
    empPlanLeave: DataTypes.INTEGER,
    empUnplanLeave: DataTypes.INTEGER
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