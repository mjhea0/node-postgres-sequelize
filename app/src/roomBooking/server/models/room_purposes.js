'use strict';
module.exports = function(sequelize, DataTypes) {
  var Room_Purposes = sequelize.define('Room_Purposes', {
    room_id: DataTypes.INTEGER,
    purpose_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Room_Purposes;
};