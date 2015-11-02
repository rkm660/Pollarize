/**
 * Controls submit functionality
 */
app.controller('SubmitController', function($scope, $rootScope, $location) {
    console.log("In Submit Controller");
    
    $scope.submitPost = function(p, a1, a2, d, cat){
    	console.log(p, a1, a2, d);
    	var ref = new Firebase("https://pollarize395.firebaseio.com/polls/");
    	var date;
    	if (d == undefined){
    		date = "N/A";
    	}
    	else{
    		date = d;
    	}
    	if (!cat){
    		var cat = "General";
    	}
    	if (!$rootScope.currentUser){
    		alert("You must log in in order to post a poll!");
    	}
    	else if (a1 == a2){
    		alert("The two answers must be different!");
    	}
    	else{
    		ref.push({
			poll: p,
			answerA: a1,
			votesA: ["initial"],
			votesB: ["initial"],
			answerB: a2,
			dateBy: date,
			category: cat,
			createdBy: $rootScope.currentUser.uid,
			timestamp: Firebase.ServerValue.TIMESTAMP
			});
			alert("Your poll has been successfully posted!");
			$location.path("/");
    	}
    	
		
    };	
});