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
        
        $scope.exitApp = function(item){
                if(item == "Exit App"){
                        console.log("exit");
                        ionic.Platform.exitApp();
                }
        }
        

})
