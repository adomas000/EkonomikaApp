angular.module("App")

.controller("addFundsCtrl",function($scope,_USER,_DB){

        $scope.addFunds = function(money,note){
            _USER.insertFunds(money,note);
            _DB.update();
            var path = window.location.pathname + "#/dashboard";
            window.location.href = path;
        }
        
    


});