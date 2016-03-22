'use strict';
angular.module('postgreDbApp.services', [])

.factory('getTodosService', function($http, $q) {
    return {
        getTodos: function() {
    	    
        	var deferred = $q.defer();

            $http.get('/api/todos/')
            .success(function(data) {
            	deferred.resolve(data);
            })
            .error(function(reason) {
            	deferred.reject(reason);
            });
            return deferred.promise
        }
    };
})

.factory('createTodoService', function($http, $q) {
    return {
        createTodo: function(todo) {
        	
        	var deferred = $q.defer();
        	
        	todo.user_id = 1;
            $http.post('/api/todos/', todo)
            .success(function(data) {
            	deferred.resolve(data);
            })
            .error(function(reason) {
            	deferred.reject(reason);
            });
            return deferred.promise
        }
    } 
})

.factory('updateTodoService', function($http, $q) {
    return {
        updateTodo: function(id, updateData) {
    	    
        	var deferred = $q.defer();

            $http.put('/api/todos/' + id, updateData)
            .success(function(data) {
            	console.log("Success");//TEST
            	deferred.resolve(data);
            })
            .error(function(reason) {
            	console.log("Error");//TEST        	
            	deferred.reject(reason);
            });
            return deferred.promise
        }
    } 
})

.factory('deleteTodoService', function($http, $q) {
    return {
        deleteTodo: function(id) {
    	    
        	var deferred = $q.defer();

            $http.delete('/api/todos/' + id)        
            .success(function(data) {
            	deferred.resolve(data);
            })
            .error(function(reason) {
            	deferred.reject(reason);
            });
            return deferred.promise
        }
    } 
});
