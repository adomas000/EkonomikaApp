angular.module("App")

.controller("balanceCtrl",function($scope,$ionicListDelegate){
    
    /**
     * setting balance width depending on the screen size
     */
    var balance = document.getElementById("balance");
    
    balance.style.removeProperty("font-size");
    console.log(balance.style.fontSize);
    
    var size = window.innerWidth/5;
    balance.style.setProperty("font-size",size+"px");
    //==================
    $scope.items = ["a","ad","ae","ra","af","ag","aj","am","ac","av","ab",];
    $scope.scroll = "true";

});
