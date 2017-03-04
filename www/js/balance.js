angular.module("App")

.controller("balanceCtrl",function($scope,_USER){
    
    /**
     * setting balance width depending on the screen size
     */
    function initSize(){
        var balance = document.getElementById("balance");
        
        balance.style.removeProperty("font-size");
        console.log(balance.style.fontSize);
        
        var size = window.innerWidth/5;
        balance.style.setProperty("font-size",size+"px");
        $scope.balance = _USER.funds.currBalance;
    }

    initSize();
   
    //==================
    var redC = "#ff635b";
    var greenC = "#22c135";
    $scope.latestChanges = [];
   /**
    * getting the latest 10 changes 
    */
    function initLatestChanges(){
        var changes = [];
        var data = _USER.funds.data;
        var count = 10;

        for(var i = data.length-1;i>=0;i--){
           for(var j = data[i].dayData.length-1;j>=0;j--){

               var color;
               var note;

               if(data[i].dayData[j].balanceChange.substring(0,1)=="+")
                color = greenC;
               else
                color = redC;

                if(data[i].dayData[j].item.length>13)
                {
                    note = data[i].dayData[j].item.substring(0,13)+"...";
                }
                else{
                    note = data[i].dayData[j].item;
                }

                changes.push({
                    change:data[i].dayData[j].balanceChange,
                    time:data[i].dayData[j].time,
                    color:color,
                    note:note
                })
                if(count<=0)
                {
                    
                    
                    return;
                }
                
                count--;
            } 
        }
        $scope.latestChanges = changes;
       
    }
    initLatestChanges();

   

});
