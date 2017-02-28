angular.module("App")

.controller("registerCtrl",function($scope,_DB,_USER){

    $scope.handleRegistration = function(){
        var fname = $scope.fname;
        var lname = $scope.lname;
        var time  = new Date().getFullYear()+"/"+ (new Date().getMonth() + 1) +"/" + new Date().getDate() + "  " + new Date().getHours()+":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        
        _USER.firstTimeInit();
        _USER.changeUserData(fname,lname,time,JSON.stringify(_USER.funds));
        _DB.insert(fname,lname,time,_USER.funds);
        console.log(JSON.stringify(_USER));
        window.location.href = window.location.pathname + "#/dashboard";
    }

});