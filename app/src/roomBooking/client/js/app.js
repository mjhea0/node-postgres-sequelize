'use strict';

var confRoomBooking = angular.module('confRoomBooking', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider){

        $routeProvider
          .when('/roomBooking', {
              templateUrl: 'roomBooking/client/views/main.tpl.html',
              controller: 'confRoomCtrl'
          })
          .otherwise({
              redirectTo: '/roomBooking'
          });

    }]);
