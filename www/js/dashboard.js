angular.module("App")

.controller("dashCtrl",function($scope,_USER){
    $scope.user = _USER;

    $scope.user.fullName = function(){
        if(!_USER.isNull)
        return this.name + " " + this.lname;
        //
        return "Login";  

    };
    

});