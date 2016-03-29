var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function(req, res, next) {
	  res.render('index', { title: 'Express' });
});

//get Employee Details by empCode
router.get('/api/employee/:id', function(req, res) {
	models.Employee.find({
	    where: {
	      empCode: req.params.id
	    }
	}).then(function(emp) {
    res.json(emp);
    });
});

//get Leave Details by empCode
router.get('/api/leave/:empId', function(req, res) {
	models.LeaveTxn.find({
	    where: {
	      EmployeeId: req.params.empId
	    }
	}).then(function(leave) {
	   res.json(leave);
    });
});

//add new leave
router.post('/api/leave', function(req, res) {
	models.LeaveTxn.create({
	leaveType: req.body.leaveType,
	startDate: req.body.startDate,
	endDate: req.body.endDate,
	startHalf: req.body.startHalf,
	endHalf: req.body.endHalf,
	endDate: req.body.endDate,
	phoneNo: req.body.phoneNo,
	reason: req.body.reason,
	approver: req.body.approver,
	EmployeeId: req.body.empCode
  }).then(function(leave) {
	  models.LeaveTxn.find({
		    where: {
			      EmployeeId: req.params.empCode
			}
	      res.json(leave);
	  });
  });
});
module.exports = router;