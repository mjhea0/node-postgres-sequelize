var express = require('express');
var router = express.Router();
var models = require('../models/index');
var moment = require('moment');

router.get('/', function(req, res, next) {
	  res.render('index', { title: 'Express' });
});

//get All Employees Details
router.get('/api/employee', function(req, res) {
	models.Employee.findAll({})
	.then(function(emp) {
		res.json(emp);
    });
});

//get Leave Details by empCode
router.get('/api/leaveList/:empId', function(req, res) {
	models.LeaveTxn.findAll({
	    where: {
	      EmployeeId: req.params.empId
	    }
	}).then(function(leave) {
		res.json(leave);
    });
});

//add new leave
router.use('/api/leave', function(req, res, next) {
	var isStartHalf = req.body.isStartHalf;
	var isEndHalf = req.body.isEndHalf;
	var startDate = new Date(req.body.startDate);
	var endDate = new Date(req.body.endDate);
	var startHalf = req.body.startHalf;
	var endHalf = req.body.endHalf;
	
	var days = moment(endDate).diff(startDate, 'days');
	console.log(days);
	
	if(!isStartHalf && !isEndHalf) {
		console.log("no");
		req.body.leaveDays = days+1;
	} else if(isStartHalf && isEndHalf) {
		console.log("yes");
		req.body.leaveDays = 1/startHalf + endHalf/2 + days -1;
	} else if(isStartHalf && !isEndHalf) {
		console.log("1 yes");
		req.body.leaveDays = 1/startHalf + days;
	} else if(!isStartHalf && isEndHalf) {
		console.log("1 no");
		req.body.leaveDays = endHalf/2 + days;
	}
	console.log("req.body.leaveDays "+ req.body.leaveDays);
	  next();
	  
	});
router.post('/api/leave', function(req, res) {
	console.log("in post fxn");
	models.LeaveTxn.create({
	leaveType: req.body.leaveType,
	startDate: req.body.startDate,
	endDate: req.body.endDate,
	isStartHalf: req.body.isStartHalf,
	startHalf: req.body.startHalf,
	isEndHalf: req.body.isEndHalf,
	endHalf: req.body.endHalf,
	phoneNo: req.body.phoneNo,
	reason: req.body.reason,
	approver: req.body.approver,
	EmployeeId: req.body.EmployeeId
  }).then(function(emp) {
	  models.Employee.find({
		    where: {
		      EmployeeId: req.body.EmployeeId
		    }
	 }).then(function(emp) {
		 if(emp) {
			 var planLeaves, unplanLeaves, floatLeaves;
			 var leaveType = req.body.leaveType;
			 var leaveDays = req.body.leaveDays;
			 
			 if(leaveType == 'PL') {
				 planLeaves = emp.empPlanLeave - leaveDays;
			 } else {
				 planLeaves = emp.empPlanLeave;
			 }
			 if(leaveType == 'UL') {
				 unplanLeaves = emp.empUnplanLeave - leaveDays;
			 } else {
				 unplanLeaves = emp.empUnplanLeave;
			 }
			 if(leaveType == 'FH') {
				 floatLeaves = emp.empFH - leaveDays;
			 }
			 
			 emp.updateAttributes({
				empPlanLeave: planLeaves,
			 	empUnplanLeave: unplanLeaves,
			 	empFH: floatLeaves
			}); 
		 }
	});
  });
});

module.exports = router;