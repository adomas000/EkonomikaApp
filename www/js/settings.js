angular.module("App")

.controller("settingsCtrl",function($scope){

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

   
    
});