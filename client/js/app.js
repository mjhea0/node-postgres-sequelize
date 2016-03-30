'use strict';
angular.module('postgreDbApp', ['ngRoute', 'postgreDbApp.controllers', 'postgreDbApp.services'])
.config(function ($routeProvider, $locationProvider) {
	
	$routeProvider
    .when('/', {
        templateUrl: 'views/main.tpl.html',
        controller: 'MainCtrl',
        reloadOnSearch: false
    })
    .otherwise({
        redirectTo: '/'
    });
      
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  });