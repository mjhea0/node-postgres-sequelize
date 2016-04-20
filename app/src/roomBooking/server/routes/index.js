var express = require('express');
var router = express.Router();
var path = require('path');
var models = require('../models/index');
var moment = require('moment');

router.get('/', function(req, res, next) {
	console.log('in booking..'+path.join(__dirname, './../../client'))
	res.sendFile('index.html', { root : path.join(__dirname, './../../client')});
});

//get all locations
router.get('/api/location', function(req, res) {
  models.Location.findAll({attributes: ['id', 'name', 'selected']}).then(function(location) {
    res.json(location);
  });
});

//get all purposes
router.get('/api/purpose', function(req, res) {
  models.Purpose.findAll({attributes: ['id', 'name']}).then(function(purpose) {
    res.json(purpose);
  });
});

//get all facilities
router.get('/api/facility', function(req, res) {
	models.Facility.findAll({attributes: ['id', 'name', 'selected']}).then(function(facility) {
		res.json(facility);
  });
	
});

//add new entry of booked room
router.post('/api/book-a-room', function(req, res) {
	var start_time = moment(req.body.timeHours + ':' + req.body.timeMinutes + ' ' + req.body.timeCycle, ["h:mm A"]);
	var formatted_start_time = start_time.format("h:mm A");
	var end_time = start_time.add({hours: req.body.durationHours, minutes: req.body.durationMinutes});
	var formatted_end_time = end_time.format("h:mm A");
	
	models.Occupied.create({
		room_id: req.body.room_id,
		date: req.body.date,
		start_time: formatted_start_time,
		durationHours: req.body.durationHours,
		durationMinutes: req.body.durationMinutes,
		end_time: formatted_end_time,
		meetingSubject: req.body.meetingSubject,
		timeHours: req.body.timeHours,
		timeMinutes: req.body.timeMinutes,
		timeCycle: req.body.timeCycle
	}).then(function(todo) {
		models.Occupied.findAll({}).then(function(roomsOccupied) {
			res.json(roomsOccupied);
		});
	});	
});


//get all matching rooms excluding those occupied

router.get('/api/search', function(req, res) {

	var location = req.body.locations;	
	var facility = req.body.facilities.length == 0 ? [1,2,3,4,5] : req.body.facilities;
	var start_time = moment(req.body.timeHours + ':' + req.body.timeMinutes + ' ' + req.body.timeCycle, ["h:mm A"]);
	var requested_start_time = start_time.format('HH:mm:ss');
	var end_time = start_time.add({hours: req.body.durationHours, minutes: req.body.durationMinutes});
	var requested_end_time = end_time.format('HH:mm:ss');
	
	var part1 = 'SELECT DISTINCT "R"."id", "R"."name", "R"."details", "L"."name", "R"."max_capacity"';
	var part2 = 'FROM "Occupieds" AS "O", "Locations" AS "L" INNER JOIN "Rooms" AS "R" ON "R"."location_id" = "L"."id"';
	var part3 = 'INNER JOIN "Room_Facilities" AS "RF" ON "RF"."room_id" = "R"."id"';
	var part4 = 'INNER JOIN "Facilities" AS "F" ON  "RF"."facility_id" = "F"."id"'; 
	var part5 = 'INNER JOIN "Room_Purposes" AS "RP" ON "RP"."room_id" = "R"."id"';
	var part6 = 'INNER JOIN  "Purposes" AS "P"  ON  "P"."id" = "RP"."purpose_id" WHERE "L"."id" IN (' + location.toString() + ') AND "R"."min_capacity" <= ? ';
	var part7 = 'AND "R"."max_capacity" >= ? AND "F"."id" IN (' +  facility.toString() + ') AND "P"."id"= ? and "R"."id" NOT IN(';
	var part8 = 'SELECT "O"."room_id" FROM "Occupieds" AS "O" WHERE "O"."date" = ? AND ' + "('" + requested_start_time + "'" + ' BETWEEN "O"."start_time" AND "O"."end_time"';
	var part9 = ' OR ' + "('" + requested_start_time + "'" + ' <= "O"."start_time" AND ' + " '" + requested_end_time + "'" + ' > "O"."start_time")))';
	var query = part1 + part2 + part3 + part4 + part5 + part6 + part7 + part8 + part9;
	
	models.sequelize.query(query, {replacements:[req.body.capacity, req.body.capacity, req.body.purpose, req.body.dateValue]})
	  .then(function(result) {
		  res.json(result[0]);
	  });
});




module.exports = router;
