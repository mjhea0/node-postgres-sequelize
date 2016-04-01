'use strict';
module.exports = function(sequelize, DataTypes) {
  var Rooms = sequelize.define('Rooms', {
    location_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    min_capacity: DataTypes.INTEGER,
    max_capacity: DataTypes.INTEGER,
    details: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Rooms;
};