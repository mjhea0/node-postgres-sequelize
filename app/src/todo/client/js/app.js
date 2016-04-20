angular.module('postgreDbApp', ['ngRoute', 'postgreDbApp.controllers', 'postgreDbApp.services'])
.config(function ($routeProvider) {
	$routeProvider
	    .when('/home', {
	        templateUrl: 'todo/client/views/main.tpl.html',
	        controller: 'MainCtrl',
	        reloadOnSearch: false
	    })
	    .otherwise({
	        redirectTo: '/home'
	    });
  });