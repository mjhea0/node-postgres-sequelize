'use strict';
angular.module('myApp.services', [])
.service('EmployeeService', function () {
  this.empCode;

    this.getEmployee = function() {
      return this.empCode;

    },
    this.setEmployee = function(code) {
      console.log("code" + code);
      this.empCode = code;
    }
})

.factory('leaveMgtFactory', function($http, $q) {
    return {
        getEmployee: function() {

	        var deferred = $q.defer();
	        $http.get("leave-management/api/employee/")
	        .success(function(data) {
		        deferred.resolve(data);
		    })
            .error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise
        },

		getFloatingLeaves: function() {

			var deferred = $q.defer();
			$http.get("/data/ft.json")
			.success(function(data) {
		        deferred.resolve(data);
		    })
		    .error(function(error) {
		        deferred.reject(error);
		    });
			return deferred.promise
		},

		getEmployeeLeaves: function(empcode) {

			var deferred = $q.defer();
			$http.get('leave-management/api/leaveList/' + empcode)
			.success(function(data) {
		        deferred.resolve(data);
		    })
		    .error(function(error) {
		        deferred.reject(error);
		    });
			return deferred.promise
		},

		applyLeave: function(res) {

			var deferred = $q.defer();
	        $http.post('leave-management/api/leave', res)
	        .success(function(res) {
		        deferred.resolve(res);
	        })
	        .error(function(error) {
		        deferred.reject(error);
	        });
			return deferred.promise
		}
    };
});