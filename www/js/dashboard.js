angular.module("App")

.controller("dashCtrl",function($scope,_USER){

    console.error("dashboard opened");

    $scope.user = _USER;

    if($scope.user.name!="")
        $scope.user.fullName();

    $scope.user.fullName = function(){
        if(!_USER.isNull)
        return this.name + " " + this.lname;
        //
        return "Login";  

    };

    $scope.goTo = function(hash){
        var path = window.location.pathname + hash;
        window.location.href = path;
    }
    

});