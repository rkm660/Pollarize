/**
 * app.js
 */
var app = angular.module('PollApp', [
    'ngRoute', 'ngTouch', 'firebase'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    // Answer
        .when("/", {
        templateUrl: "partials/poll.html",
        controller: "PollController"
    })
    // Submit
        .when("/submit", {
        templateUrl: "partials/submit.html",
        controller: "SubmitController"
    })
	// Archive
        .when("/archive", {
        templateUrl: "partials/archive.html",
        controller: "ArchiveController"
    })
    // Social Science
        .when("/science", {
        templateUrl: "partials/socialScience.html",
        controller: "ScienceController"
    })
    // else 404
    .otherwise("/404", {
        templateUrl: "partials/404.html",
        controller: ""
    });
}]);


