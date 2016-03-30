'use strict';
module.exports = function(sequelize, DataTypes) {
  var Purpose = sequelize.define('Purpose', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Purpose;
};