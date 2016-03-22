'use strict';

angular.module('postgreDbApp.controllers', [])
.controller('MainCtrl', function($scope, $q, getTodosService, 
	createTodoService, updateTodoService, deleteTodoService) {

	$scope.formData = {};
	$scope.todos={};

	/*
	 * Get Todos
	 */
	getTodosService.getTodos()
		.then(function(answer) {
			$scope.todos = answer;
		},
		function(error) {
			console.log("OOPS!!!! " + JSON.stringify(error));
		}
  	);


	/*
	 * Create a New Todo
	 */
	$scope.createTodo = function() {
		createTodoService.createTodo($scope.formData)
			.then(function(answer) {
				$scope.todos = answer;
				$scope.formData.title = '';
			},
			function(error) {
				console.log("OOPS Error Creating Todo!!!! " + JSON.stringify(error));
			}
	  	);
	};


	/*
	 * Update a Todo
	 */
	$scope.editTodo = function(id, txt, isDone) {

		var updateData = {"title":txt, "complete": isDone};

		updateTodoService.updateTodo(id, updateData)
			.then(function(answer) {
				$scope.todos = answer;
			},
			function(error) {
				console.log("OOPS Error Updating!!!! " + JSON.stringify(error));
			}
	  	);
	};


	/*
	 * Delete a Todo
	 */
	$scope.deleteTodo = function(id) {
		deleteTodoService.deleteTodo(id)
			.then(function(answer) {
				$scope.todos = answer;
			},
			function(error) {
				console.log("OOPS Error Deleting!!!! " + JSON.stringify(error));
			}
	  	);
	};
	
	$scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todos, function(todo) {
          count += todo.complete ? 0 : 1;
      });
      return count;
    };
});
