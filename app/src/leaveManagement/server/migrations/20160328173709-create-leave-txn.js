'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('LeaveTxns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      empCode: {
        type: Sequelize.STRING
      },
      leaveType: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATEONLY
      },
      endDate: {
        type: Sequelize.DATEONLY
      },
      startHalf: {
        type: Sequelize.INTEGER
      },
      endHalf: {
        type: Sequelize.INTEGER
      },
      phoneNo: {
        type: Sequelize.STRING
      },
      reason: {
        type: Sequelize.STRING
      },
      approver: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('LeaveTxns');
  }
};