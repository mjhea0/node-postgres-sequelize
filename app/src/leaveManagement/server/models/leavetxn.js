'use strict';
module.exports = function(sequelize, DataTypes) {
  var LeaveTxn = sequelize.define('LeaveTxn', {
    leaveType: DataTypes.STRING,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    startHalf: DataTypes.INTEGER,
    endHalf: DataTypes.INTEGER,
    phoneNo: DataTypes.STRING,
    reason: DataTypes.STRING,
    approver: DataTypes.STRING,
    isStartHalf: DataTypes.BOOLEAN,
    isEndHalf: DataTypes.BOOLEAN,
    EmployeeId: {
    	type: DataTypes.STRING,
    references: {
        model: "Employee",
        key: "EmployeeId"
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
    	  LeaveTxn.belongsTo(models.Employee, {foreignKey: 'EmployeeId', targetKey: 'EmployeeId'});  
      }
    }
  });
  return LeaveTxn;
};