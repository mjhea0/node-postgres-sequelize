'use strict';
module.exports = function(sequelize, DataTypes) {
  var Facility = sequelize.define('Facility', {
    name: DataTypes.STRING,
    selected: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Facility;
};