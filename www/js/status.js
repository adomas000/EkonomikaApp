angular.module("App")

.controller("statusCtrl",function($scope,_USER,_DB){
        /**
        * labels and data
        */
        var labels = [];
        var data   = [];
        //


        /**
         * 
         * outputing the Chart
         */
        var ctx = document.getElementById("myChart");

        var data = {
                    labels: labels,
                    
                    datasets: [
                        {
                            label:"hey",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: data,
                            spanGaps: false,
                        }
                    ]
        };


        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: data

        });


 
        ctx.onclick = function(e){
           var points = myLineChart.getElementsAtEvent(e);
           if(points[0]==undefined)
           return;
           console.log(points[0]);
           

        };
        //part where I set up selections of year and months
        function setUpTimeline(){
            var timePassed = _USER.timePassed;
            var yearNode = document.getElementById("statYear");
           
            
        
            //loop thru years
            for(var i = 0;i<timePassed.length;i++){

                var option = document.createElement("option");
                option.value = timePassed[i].year;
                option.textContent = timePassed[i].year;
                if(i==timePassed.length-1)
                  option.setAttribute("ng-selected","true");

                yearNode.appendChild(option);

                
            }

         }
         setUpTimeline();
               


        
        var monthNode = document.getElementById("statMonth");

       $scope.handleYearChange = function(e) {

           
                
                if(monthNode.children.length>1)
                    DeleteMonthChildren(monthNode);
                var obj =[];
            var timePassed = _USER.timePassed;
             for(var i = 0; i<timePassed.length;i++){
                if(timePassed[i].year == e)
                {
                    obj = timePassed[i].months;
                    break;
                }
                
            }

           

            for(var i = 0; i<obj.length;i++){

                var option = document.createElement("option");
                option.setAttribute("value",obj[i].id);
                option.textContent = obj[i].name;
                
                monthNode.appendChild(option);

            }
            
                
       }

       function DeleteMonthChildren(month){

            while(month.firstChild)
                month.removeChild(month.firstChild);

       }
       var monthData =[];

       $scope.setUpChartData = function(year,month){
            var data = _USER.funds.data;
            
            //find the data we need
            for(var i=0;i<data.length;i++)
            {
                if(data[i].date.year==year&&data[i].date.month-1==month)
                     {
                         monthData.push(data[i]);
                        //  console.log(JSON.stringify(monthData));
               
                     }
            }
/**
 * dar nesugalvojau sito
 */
            var days = new Date(year,month,0).getDate();
            var latest = 0;
            for(var i = 1;i<=days;i++){
                labels.push(i);
                for(var j = 0;j<monthData.length;j++){
                    
                    if(monthData[j].date.day = i){
                        data.push(monthData.balance);
                        latest = monthData.balance;
                        
                    }
                    else{
                        data.push(latest);
                        
                    }
                }
            }
            
            

       }
       
});