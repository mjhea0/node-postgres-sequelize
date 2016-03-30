var express = require('express');
var router = express.Router();
var models = require('../models/index');
var moment = require('moment');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

module.exports = router;
