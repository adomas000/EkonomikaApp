angular.module("App")

.controller("settingsCtrl",function($scope,_DB){

    var settings = [
        {
            name:"HTML5",
            checked:false
        }
    ];

    $scope.handleCheck = function(id){
        var button = settings[id];
        if(button.checked)
            settings[id].checked = false;
        else
            settings[id].checked = true;

             console.log(settings[0].checked);
    }

    $scope.handleReset = function(){

        var reset = window.confirm("Are you sure you want to reset all your progress?"); 
        if(!reset)
        return;

        _DB.removeDatabase();
        _DB.startDatabase();
        _DB.setRowsLength();
        _DB.showRegisterWindow(500);
        


    }
   
    
});