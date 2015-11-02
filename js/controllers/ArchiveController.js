/**
 * Controls archive sec
 */
app.controller('ArchiveController', function($scope, $rootScope, $http, $firebaseArray, PollService) {
    console.log("In Archive Controller");
    
    PollService.getGeneralPolls().then(function(polls){
    	$scope.polls = polls;
    	console.log(polls);
    });
    
    $scope.chooseA = function(key,poll){
    	if ($rootScope.currentUser){
    		var votes = PollService.chooseA(key,poll);
    		return [votes[0].length-1, votes[1].length-1];
    	}
    	else {
    		alert("You must be logged in to vote!");
    	}
		
    };
    
    $scope.chooseB = function(key,poll){
    	if ($rootScope.currentUser){
    		var votes = PollService.chooseB(key,poll);
    		return [votes[0].length-1, votes[1].length-1];
    	}
    	else {
    		alert("You must be logged in to vote!");
    	}
    };
    
});

