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
    .state("status",{
        cache:false,
        url:'/status',
        templateUrl:"templates/status.html"
    })
    .state("balance",{
        cache:false,
        url:'/balance',
        templateUrl:"templates/balance.html"
    })
    .state("addFunds",{
        url:'/addFunds',
        templateUrl:"templates/addFunds.html"
    })
    .state("removeFunds",{
        url:'/removeFunds',
        templateUrl:"templates/removeFunds.html"
    })
    .state("register",{
        url: '/register',
        templateUrl: 'templates/register.html'
    });

    $urlRouterProvider.otherwise('dashboard');

});