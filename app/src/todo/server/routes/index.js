var express = require('express');
var router = express.Router();
var path = require('path');
var models = require('../models/index');

router.get('/', function(req, res, next) {
	res.sendFile('index.html', { root : path.join(__dirname, './../../client')});
});

//get all todos of user
router.get('/api/user/:userId', function(req, res) {
  models.User.findAll({
      where: {
    	  userCode: req.params.userId
	  }, include: [ models.Todo]
  }).then(function(todos) {
      res.json(todos);
  });
});

// get all todos
router.get('/api/todos/:userId', function(req, res) {
  models.Todo.findAll({
		where: {
			userCode: req.params.userId
	    }, include: [ models.User]
  }).then(function(todos) {
    res.json(todos);
  });
});

// add new todo
router.post('/api/todos', function(req, res) {
	var userIdFromParam = req.body.userEmpCode;
	models.Todo.create({
		title: req.body.title,
		userCode: userIdFromParam
	}).then(function(todo) {
		res.json(todo.dataValues);
  });
});

// update single todo
router.put('/api/todos/:id', function(req, res) {
  models.Todo.find({
    where: {
      id: req.params.id
    }
  }).then(function(todo) {
    if(todo){
      todo.updateAttributes({
        title: req.body.title,
        complete: req.body.complete
      }).then(function(todo) {
    	  models.Todo.findAll({}).then(function(todos) {
    	      res.json(todos);
    	  });
      });
    }
  });
});

// delete a single todo
router.delete('/api/todos/:id', function(req, res) {
  models.Todo.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(todo) {
	  models.Todo.findAll({}).then(function(todos) {
	      res.json(todos);
	  });
  });
});

module.exports = router;
