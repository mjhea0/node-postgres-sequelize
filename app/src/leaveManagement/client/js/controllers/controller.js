angular.module('myApp.controllers', ['myApp.services'])
.controller('LoginCtrl', function($http,$scope,$routeParams, $location, EmployeeService){
        $scope.login = function() {
					EmployeeService.setEmployee($scope.emp.empCode);
        };
        $scope.auth = function(){
          $location.url('/leave');
        }
})

.controller('EmpCtrl', function($http,$scope,$filter,EmployeeService){
        $scope.empcode = EmployeeService.getEmployee();
        $http.get("leave-management/api/employee/").success(function(data,status,headers,config){
            $scope.employee = data;
            $scope.employee.empCode = $scope.empcode;
        }).error(function(data,status,headers,config){
            console.log("Data Not Loaded");
      });
      $scope.floatingList = {};
      $http.get("/data/ft.json").success(function(data,status,headers,config){
          $scope.floatingList = data;
      }).error(function(data,status,headers,config){
          console.log("Data Not Loaded");
    });
      $scope.leaveList = {};
      $http.get('leave-management/api/leaveList/' + $scope.empcode).success(function(data,status,headers,config){
          $scope.leaveList = data;  n 
      }).error(function(data,status,headers,config){
          console.log("Data Not Loaded");
    });

      $scope.submitForm = function() { //Post reuest on submit form
        var res = $scope.emp;
        $http.post('leave-management/api/leave', res).success(function(res){
       }).error(function(){
         console.log('error');
       });
     };

//Validations

       $scope.checkDateErr = function (startDate, endDate) {
          if (new Date($scope.emp.startDate) > new Date($scope.emp.endDate)) {
              $scope.errMessage = '*End Date should be greater than start date';
                return false;
              }
              else {
                  $scope.errMessage = '';
              }
          };

      	$scope.floating = function() {
          $scope.emp.empCode = $scope.empcode;
      		$scope.emp.startDate = "";
      		$scope.emp.endDate = "";
      		var today = new Date();
      		var tomorrow = new Date(+ today + 86400000);
      		var yesterday = new Date(+ today - 86400000);
      		today = $filter('date')(today, "yyyy-MM-dd");
      		tomorrow = $filter('date')(tomorrow, "yyyy-MM-dd");
      		yesterday = $filter('date')(yesterday, "yyyy-MM-dd");

          if($scope.emp.leaveType == "FH1" || $scope.emp.leaveType == "FH2"){

            $scope.emp.floating_value = true;
      			$scope.emp.isStartHalf = false;
      			$scope.emp.isEndHalf = false;
      		}
      		else if($scope.emp.leaveType == "PL"){

      			$scope.emp.floating_value = false;
      			var myEl = angular.element( document.querySelector( '#startDate' ) );
      			myEl.attr('min',tomorrow);
      			myEl = angular.element( document.querySelector( '#startDate' ) );
      			myEl.attr('max',"");
      			myEl = angular.element( document.querySelector( '#endDate' ) );
      			myEl.attr('min',tomorrow);
      			myEl = angular.element( document.querySelector( '#endDate' ) );
      			myEl.attr('max',"");
      			$scope.floating_day = "";
      		}
      		else if($scope.emp.leaveType == "UL"){
      			$scope.emp.floating_value = false;
      			var myEl = angular.element( document.querySelector( '#endDate' ) );
      			myEl.attr('max',yesterday);
      			myEl = angular.element( document.querySelector( '#endDate' ) );
      			myEl.attr('min',"");
      			myEl = angular.element( document.querySelector( '#startDate' ) );
      			myEl.attr('max',yesterday);
      			myEl = angular.element( document.querySelector( '#startDate' ) );
      			myEl.attr('min',"");
      		}
      	};

      	$scope.changefloating = function(date){
      		if(date === null){
      			$scope.emp.startDate = new Date("");
      			$scope.emp.endDate = new Date("");
      		}
      		else{
      			$scope.emp.startDate = new Date(date);
      			$scope.emp.endDate = new Date(date);
      		}
      	};

          $scope.checkhalf_day1 = function (isStartHalf) {
              if (!$scope.emp.isStartHalf) {
                  $scope.emp.startHalf = "";
              }
          };
          $scope.checkhalf_day2 = function (half_day2) {
              if (!$scope.emp.half_day2) {
                  $scope.emp.half_day2_value = "";
              }
          };
$scope.master = {};
 $scope.update = function(emp) {

   $http.post("leave-management/api/leave").success(function(data,status,headers,config){
    $scope.employee = data;
   $scope.employee.empCode = $scope.empcode;
   }).error(function(data,status,headers,config){
    console.log("Data Not Loaded");
   });

  $scope.master = angular.copy(emp);
  console.log("emp :" + emp);
 };

});
