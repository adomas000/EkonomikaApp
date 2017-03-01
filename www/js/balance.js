angular.module("App")

.controller("balanceCtrl",function(){
    
    
    var balance = document.getElementById("balance");
    
    balance.style.removeProperty("font-size");
    console.log(balance.style.fontSize);
    
    var size = window.innerWidth/5;
    balance.style.setProperty("font-size",size+"px");
  

});
