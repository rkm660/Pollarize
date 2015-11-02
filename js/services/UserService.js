/**
 * User service
 */
app.service('UserService', function() {
    console.log("In User service");
	var ref = new Firebase("https://pollarize395.firebaseio.com/users");
	
    this.addUser = function(uid, fName, lName, email) {
        var usersRef = ref.child(uid);
        usersRef.set({
        	public : {
        	fName: fName,
        	lName: lName,
        	email: email
        	}
        });
    };
});