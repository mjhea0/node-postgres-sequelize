'use strict';
angular.module('postgreDbApp', ['ngRoute', 'postgreDbApp.controllers', 'postgreDbApp.services'])
.config(function ($routeProvider, $locationProvider) {
	
	$routeProvider
    .when('/todo', {
        templateUrl: 'todo/client/views/main.tpl.html',
        controller: 'MainCtrl',
        reloadOnSearch: false
    })
    .otherwise({
        redirectTo: '/todo'
    });
      
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  });