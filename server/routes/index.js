var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// get all todos
router.get('/api/todos', function(req, res) {
  models.Todo.findAll({}).then(function(todos) {
    res.json(todos);
  });
});

// add new todo
router.post('/api/todos', function(req, res) {
	models.Todo.create({
    title: req.body.title,
    UserId: req.body.user_id
  }).then(function(todo) {
	  models.Todo.findAll({}).then(function(todos) {
	      res.json(todos);
	  });
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
