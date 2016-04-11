'use strict';
module.exports = function(sequelize, DataTypes) {
  var Occupied = sequelize.define('Occupied', {
    room_id: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    durationHours: DataTypes.INTEGER,
    durationMinutes: DataTypes.INTEGER,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    meetingSubject: DataTypes.STRING,
    timeHours: DataTypes.INTEGER,
    timeMinutes: DataTypes.INTEGER,
    timeCycle: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Occupied;
};