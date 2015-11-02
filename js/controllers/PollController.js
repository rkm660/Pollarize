/**
 * Controls polls
 */
app.controller('PollController', function($scope, $rootScope, $http, $firebaseArray, $q, $timeout, PollService) {
    console.log("In Poll Controller");
	
	$scope.getNextPoll = function(){
		PollService.getNextPoll($rootScope.currentUser).then(function(res){
			console.log(res);
			$scope.poll = res;
        });
	};
	
	$scope.userHasVoted = function(poll){
		return PollService.hasVoted($rootScope.currentUser.uid, poll);
	};
	
	 $scope.chooseA = function(key,poll){
		var votes = PollService.chooseA(key,poll);
    	return [votes[0].length-1, votes[1].length-1];
    };
    
    $scope.chooseB = function(key,poll){
    	var votes = PollService.chooseB(key,poll);
    	return [votes[0].length-1, votes[1].length-1];
    };
    
    $scope.skip = function(key, poll){
    	PollService.addToSkip(key, poll, user);
    };
    
    $scope.getNextPoll();
    
});