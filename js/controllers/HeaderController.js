/**
 * Controls header
 */
app.controller('HeaderController', function($scope,$rootScope, $timeout, UserService) {
    console.log("In Header Controller");
    var ref = new Firebase("https://pollarize395.firebaseio.com");
    var init = function() {
        var loggedIn;
        var auth = ref.getAuth();
        if (auth) {
            loggedIn = true;
        } else {
            loggedIn = false;
        }
        $timeout(function() {
            $rootScope.$apply(function() {
                $rootScope.loggedIn = loggedIn;
                $rootScope.currentUser = auth;
                console.log($rootScope.currentUser);
            });
        }, 0);
    };

    $scope.login = function() {
        ref.authWithOAuthPopup("facebook", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                $timeout(function() {
                    $rootScope.$apply(function() {
                        $rootScope.loggedIn = true;
                        $rootScope.currentUser = authData;
                        UserService.addUser(authData.uid,authData.facebook.cachedUserProfile.first_name,authData.facebook.cachedUserProfile.last_name,authData.facebook.email);
                    });
                }, 0);
            }
        },{  scope: "email,user_likes"});
    };

    $scope.logout = function() {
        ref.unauth();
        $timeout(function() {
            $rootScope.$apply(function() {
                $rootScope.loggedIn = false;
                $scope.currentUser = null;
            });
        }, 0);
    };

    init();

	
});

