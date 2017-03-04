angular.module("App")

.controller("removeFundsCtrl",function($scope,_USER,_DB){

     $scope.addFunds = function(money,note){
            _USER.removeFunds(money,note);
            _DB.update();
            var path = window.location.pathname + "#/dashboard";
            window.location.href = path;
        }
    

});