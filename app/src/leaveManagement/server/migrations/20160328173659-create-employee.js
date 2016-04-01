'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      empCode: {
        type: Sequelize.STRING
      },
      empName: {
        type: Sequelize.STRING
      },
      loginName: {
        type: Sequelize.STRING
      },
      joinDate: {
        type: Sequelize.DATEONLY
      },
      empPlanLeave: {
        type: Sequelize.INTEGER
      },
      empUnplanLeave: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Employees');
  }
};