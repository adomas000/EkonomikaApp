angular.module("App")

.config(function($stateProvider,$urlRouterProvider){

    $stateProvider

    .state("settings",{
        url: '/settings',
        templateUrl: 'templates/settings.html'

    })
    .state("dashboard",{
        url: '/dashboard',
        templateUrl: 'templates/dashboard.html'
    });

    $urlRouterProvider.otherwise('dashboard');

});