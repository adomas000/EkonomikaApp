angular.module("App")

.controller("mainCtrl",function($scope,$ionicSideMenuDelegate){
        //meniu
        $scope.meniuItems = [
                "Dashboard",
                "AddFunds",
                "About",
                "Exit App"

        ];
        $scope.page = {
                name:"Dashboard"
        }
        
        $scope.toggleMeniu = function(){
             $ionicSideMenuDelegate.toggleLeft();
            //console.log("meniu");
        }
        console.log("first");

})

