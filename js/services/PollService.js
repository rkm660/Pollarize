/**
 * Poll service
 */
app.service('PollService', function($q, $rootScope) {
    console.log("In Poll service ");
    var ref = new Firebase("https://pollarize395.firebaseio.com/polls");
	
	this.getAllPolls = function(){
		var deferred = $q.defer();
    	ref.on("value", function(snapshot) {
        deferred.resolve(snapshot.val());
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
        deferred.reject(errorObject.code);
    });
    	return deferred.promise;
	};
	
    this.getGeneralPolls = function(){
    	var deferred = $q.defer();
    	ref.on("value", function(snapshot) {
        var pollsRaw = snapshot.val();
    	var pollsGeneral = {};
    	for (key in pollsRaw){
    		if (!pollsRaw[key].category || pollsRaw[key].category == "General"){
    			pollsGeneral[key] = pollsRaw[key];
     		}
    	}
        deferred.resolve(pollsGeneral);
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
        deferred.reject(errorObject.code);
    });
    	return deferred.promise;
    };
    
    this.getPollsScience = function(){
    	var deferred = $q.defer();
    	ref.on("value", function(snapshot) {
    	var pollsRaw = snapshot.val();
    	var pollsScience = {};
    	for (key in pollsRaw){
    		if (pollsRaw[key].category && pollsRaw[key].category == "Science"){
    			pollsScience[key] = pollsRaw[key];
     		}
    	}
        deferred.resolve(pollsScience);
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
        deferred.reject(errorObject.code);
    });
    	return deferred.promise;
    };
    
    
    this.chooseA = function(key,poll){
        var ref = new Firebase("https://pollarize395.firebaseio.com/polls/" + key);
        var newPoll = poll;
        if (newPoll.votesB != undefined && newPoll.votesB.indexOf($rootScope.currentUser.uid) != -1){
			var index = newPoll.votesB.indexOf($rootScope.currentUser.uid);
			newPoll.votesB.splice(index,1);
		}
		
        if (newPoll.votesA.indexOf($rootScope.currentUser.uid) == -1){
			newPoll.votesA.push($rootScope.currentUser.uid);
		}
		newPoll.votesARatio = (newPoll.votesA.length-1) == 0 ? 0 : ((newPoll.votesA.length-1) / ((newPoll.votesA.length-1) + (newPoll.votesB.length-1))*100);
		newPoll.votesBRatio = (newPoll.votesB.length-1) == 0 ? 0 : ((newPoll.votesB.length-1) / ((newPoll.votesA.length-1) + (newPoll.votesB.length-1))*100);
		console.log(newPoll);

		
		
		ref.set(newPoll);		
		return [newPoll.votesA,newPoll.votesB];

    };
    
    
    this.chooseB = function(key,poll){
        var ref = new Firebase("https://pollarize395.firebaseio.com/polls/" + key);
        var newPoll = poll;
        if (newPoll.votesA != undefined && newPoll.votesA.indexOf($rootScope.currentUser.uid) != -1){
			var index = newPoll.votesA.indexOf($rootScope.currentUser.uid);
			newPoll.votesA.splice(index,1);
		}
        
        if (newPoll.votesB.indexOf($rootScope.currentUser.uid) == -1){
				newPoll.votesB.push($rootScope.currentUser.uid);
		}
		newPoll.votesARatio = (newPoll.votesA.length-1) == 0 ? 0 : ((newPoll.votesA.length-1) / ((newPoll.votesA.length-1) + (newPoll.votesB.length-1))*100);
		newPoll.votesBRatio = (newPoll.votesB.length-1) == 0 ? 0 : ((newPoll.votesB.length-1) / ((newPoll.votesA.length-1) + (newPoll.votesB.length-1))*100);
		console.log(newPoll);
		
		ref.set(newPoll);		
		return [newPoll.votesA,newPoll.votesB];
    };
    
    
    this.getNextPoll = function(user){
    	var deferred = $q.defer();
    	var returnPoll = null;
    	this.getAllPolls().then(function(polls){
    		for (var key in polls){
    			if (polls[key].votesA.indexOf(user.uid) == -1 && polls[key].votesB.indexOf(user.uid) == -1 && (!user.skips || (user.skips && user.skips.indexOf(key) == -1))){
    				returnPoll = polls[key];
    				deferred.resolve([key,returnPoll]);
    			}
    		}
    		if (returnPoll == null){
    		deferred.resolve(returnPoll);
    		}	
    	});
    	
    	return deferred.promise;	
    };
    
    this.hasVoted = function(uid, poll){
    	if (poll == null){
    		return false;
    	}
    	else {
    	if (poll.votesA.indexOf(uid) == -1 && poll.votesB.indexOf(uid) == -1){
    		return false;
    	}
    	else{
    		return true;
    	}
    	}
    };
    
});