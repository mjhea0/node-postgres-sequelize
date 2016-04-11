var myApp = angular.module('myApp', ['ngRoute', 'myApp.controllers', 'myApp.services']);

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'LoginCtrl'
        })
        .when('/leave', {
            templateUrl: 'views/leave.html',
            controller: 'EmpCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
});
