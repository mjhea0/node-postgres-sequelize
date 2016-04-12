var myApp = angular.module('myApp', ['ngRoute', 'myApp.controllers', 'myApp.services']);

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'leaveManagement/client/views/home.html',
            controller: 'LoginCtrl'
        })
        .when('/leave', {
            templateUrl: 'leaveManagement/client/views/leave.html',
            controller: 'EmpCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
});
