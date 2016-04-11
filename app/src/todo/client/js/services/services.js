'use strict';
angular.module('postgreDbApp.services', [])

.factory('getTodosService', function($http, $q) {
    return {
        getTodos: function() {
    	    
        	var deferred = $q.defer();

            $http.get('/todo/api/todos/9564')
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
        	
        	todo.userEmpCode = 9564;
            $http.post('/todo/api/todos/', todo)
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

            $http.put('/todo/api/todos/' + id, updateData)
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

            $http.delete('/todo/api/todos/' + id)        
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

.factory('getUserService', function($http, $q) {
    return {
        getUser: function() {
    	    
        	var deferred = $q.defer();

            $http.get('/todo/api/user/9564')
            .success(function(data) {
            	deferred.resolve(data);
            })
            .error(function(reason) {
            	deferred.reject(reason);
            });
            return deferred.promise
        }
    };
});
