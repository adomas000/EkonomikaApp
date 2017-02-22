angular.module("App")

.config(function($stateProvider,$urlRouterProvider){

    $stateProvider

    .state("settings",{
        url: '/settings',
        templateUrl: 'templates/settings.html'

    })
    .state("dashboard",{
        cache: false,
        url: '/dashboard',
        templateUrl: 'templates/dashboard.html'
    })
    .state("userInfo",{
        url: '/userInfo',
        templateUrl: ' templates/userInfo.html'
    })
    .state("register",{
        url: '/register',
        templateUrl: 'templates/register.html'
    });

    $urlRouterProvider.otherwise('dashboard');

});