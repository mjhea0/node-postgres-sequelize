'use strict';

angular.module('postgreDbApp.controllers', [])
.controller('MainCtrl', function ($scope, $filter, $q, getEmployeeService, addNewLeaveService, getAppliedLeavesService, getFloatingListService) {

    $scope.employee = {};
    $scope.user = {};
	$scope.floatingList = {};
	$scope.leaveList = {};
	
	
	/*
	 * Get Employee
	 */
    getEmployeeService.getEmployee()
		.then(function(answer) {
		    $scope.employee = answer;
			//console.log("answer : " + answer);
		    $scope.employee.empCode = $scope.employee[0].empCode;
		    $scope.user.empCode = $scope.employee[0].empCode;
			/*
			 * Get AppliedLeaves
			 */
			getAppliedLeavesService.getAppliedLeaves($scope.user.empCode)
				.then(function(answer) {
					$scope.leaveList = answer;	
				},
				function(error) {
					console.log("OOPS!!!! " + JSON.stringify(error));
				}
			);	
		},
		function(error) {
			console.log("OOPS!!!! " + JSON.stringify(error));
		}
  	);
	
	//Called when user change the type of leave applied i.e. UL, PL, floating etc.
	$scope.floating = function() {
		//initialise startdate and endDate with NULL
		$scope.user.startDate = "";
		$scope.user.endDate = "";
		//Get today tomorrow and yesterday date
		var today = new Date();
		var tomorrow = new Date(+new Date() + 86400000);
		var yesterday = new Date(+new Date() - 86400000);
		//convert today tomorrow and yesterday date into YYYY-MM-dd format 
		today = $filter('date')(today, "yyyy-MM-dd");
		tomorrow = $filter('date')(tomorrow, "yyyy-MM-dd");
		yesterday = $filter('date')(yesterday, "yyyy-MM-dd");
		if($scope.user.leaveType == "FH"){
			$scope.user.floating_value = true; //this will enable floatinf list dropdown and disable startDate endDate and half day selection
			$scope.user.isStartHalf = false;
			$scope.user.isEndHalf = false;
		}
		else if($scope.user.leaveType == "PL"){
			$scope.user.floating_value = false;
			//set the min max range for startDate and endDate  
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
		else if($scope.user.leaveType == "UL"){
			$scope.user.floating_value = false;
			//set the min max range for startDate and endDate
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
	/*
	 * Get FloatingList
	 */
    getFloatingListService.getFloatingList()
		.then(function(answer) {
		    $scope.floatingList = answer;
		},
		function(error) {
			console.log("OOPS!!!! " + JSON.stringify(error));
		}
  	);
	 
    /*
	 * Add New Leave
	 */
    $scope.addLeave = function () {
        addNewLeaveService.addLeave($scope.user)
            .then(function (answer) {
				console.log("updated answer : " + answer.empCode);
                $scope.user = {};
				$scope.showme = false;
				/*
				* Get updated Employee
			 	*/
				getEmployeeService.getEmployee()
					.then(function(answer1) {
						$scope.employee = answer1;
						$scope.employee.empCode = answer.empCode;
						$scope.user.empCode = answer.empCode; 
						/*
						 * Get updated AppliedLeaves
						 */
						getAppliedLeavesService.getAppliedLeaves(answer.empCode)
							.then(function(answer) {
								$scope.leaveList = answer;
							},
							function(error) {
								console.log("OOPS!!!! " + JSON.stringify(error));
							}
						);	 
					},
					function(error) {
						console.log("OOPS!!!! " + JSON.stringify(error));
					}
				);	 
            },
            function (error) {
                console.log("OOPS Error Adding Leave!!!! " + JSON.stringify(error));
            }
        );
    };
	
	//change the date time string according to UTC +5:30 (IST)
    $scope.changeDate = function (endDate) {
		$scope.user.endDate = new Date(+new Date($scope.user.endDate) + 5.5*60*60*1000);
    };
	
	//Set startDate and endDate according to floating day selection
	$scope.changefloating = function(date){
		if(date === null){
			$scope.user.startDate = new Date("");
			$scope.user.endDate = new Date("");
		}
		else{	
			$scope.user.startDate = new Date(date);
			$scope.user.endDate = new Date(date);
		}
	};

	//clear start half selection on check-box unchecked
    $scope.checkhalf_day1 = function (isStartHalf) {
        if (!$scope.user.isStartHalf) {
            $scope.user.startHalf = "";
        }
    };
	
	//clear end half selection on check-box unchecked
    $scope.checkhalf_day2 = function (half_day2) {
        if (!$scope.user.half_day2) {
            $scope.user.half_day2_value = "";
        }
    };

	//get the employee code selected in drop-down
    $scope.getStoreData = function (emp_id) {
        $scope.user.empCode = emp_id;
		/*
		* Get AppliedLeaves on basis of drop-down selected value 
		*/
		getAppliedLeavesService.getAppliedLeaves(emp_id)
			.then(function(answer) {
				$scope.leaveList = answer;
			},
			function(error) {
				console.log("OOPS!!!! " + JSON.stringify(error));
			}
		);		
    };
	
	//set min value for endDate
	$scope.setDateRange = function(startDate) {
		var minDate = $filter('date')($scope.user.startDate, "yyyy-MM-dd");
		var myEl = angular.element( document.querySelector( '#endDate' ) );
		//change the date time string according to UTC +5:30 (IST)
		$scope.user.startDate = new Date(+new Date($scope.user.startDate) + 5.5*60*60*1000);
		myEl.attr('min',minDate);
		$scope.user.endDate = "";
	};
});