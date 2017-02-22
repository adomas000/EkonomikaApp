angular.module("App")

.controller("dashCtrl",function($scope,_USER){

    

    $scope.user = _USER;

    if($scope.user.name!="")
        $scope.user.fullName();

    $scope.user.fullName = function(){
        if(!_USER.isNull)
        return this.fname + " " + this.lname;
        //
        return "Login";  

    };

    $scope.goTo = function(hash){
        setTimeout(function(){
            var path = window.location.pathname + hash;
            window.location.href = path;
        },250);
        
    }
    

});