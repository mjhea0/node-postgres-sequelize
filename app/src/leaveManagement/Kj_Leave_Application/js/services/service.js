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
});
