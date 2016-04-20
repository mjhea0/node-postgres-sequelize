'use strict';
angular.module('postgreDbApp.services', [])

.factory('getEmployeeService', function($http, $q) {
    return {
        getEmployee: function() {
        	var deferred = $q.defer();
            $http.get('/leave/api/employee/')
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(reason) {
                deferred.reject(data);
            });
            return deferred.promise
        }
    };
})

.factory('getFloatingListService', function($http, $q) {
    return {
        getFloatingList: function() {
        	var deferred = $q.defer();
            $http.get('/data/ft.json')
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(reason) {
                deferred.reject(data);
            });
            return deferred.promise
        }
    };
})

.factory('addNewLeaveService', function ($http, $q) {
    return {
        addLeave: function (user) {

            var deferred = $q.defer();

            user.approver = "Harish Nair";
			$http.post('/leave/api/leave', user)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (reason) {
                deferred.reject(reason);
            });
            return deferred.promise
        }
    }
})

.factory('getAppliedLeavesService', function($http, $q) {
    return {
        getAppliedLeaves: function(emp_id) {
        	var deferred = $q.defer();

            $http.get('/leave/api/leaveList/' + emp_id) 
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(reason) {
                deferred.reject(data);
            });
            return deferred.promise
        }
    };
});
