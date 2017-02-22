angular.module("App")

.controller("registerCtrl",function($scope,_DB,_USER){

    $scope.handleRegistration = function(){
        var fname = $scope.fname;
        var lname = $scope.lname;
        var time  = new Date().getFullYear()+":"+ new Date().getMonth() +":" + new Date().getDay() + ":" + new Date().getHours() + new Date().getMinutes() + ":" + new Date().getSeconds();

        _DB.insert(fname,lname,time);
        _USER.changeUserData(fname,lname,time);
        console.log(JSON.stringify(_USER));
        window.location.href = window.location.pathname + "#/dashboard";
    }

});