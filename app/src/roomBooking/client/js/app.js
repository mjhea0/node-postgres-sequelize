var confRoomBooking = angular.module('confRoomBooking', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
    	$routeProvider
          .when('/home', {
              templateUrl: 'roomBooking/client/views/main.tpl.html',
              controller: 'confRoomCtrl',
  	          reloadOnSearch: false
          })
          .otherwise({
              redirectTo: '/home'
          });
    }]);
