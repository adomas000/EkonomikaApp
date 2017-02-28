angular.module("App")

.controller("statusCtrl",function($scope,_USER,_DB){

        var ctx = document.getElementById("myChart");

        var data = {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    
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
                            data: [86,50, 80, 81, 56, 55, 40],
                            spanGaps: false,
                        }
                    ]
        };


        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options:{
                showTooltips: true,
                tooltipTemplate:  "Students",
                tooltip:{
                    mode:'label'
                },
                responsive: true,
                xLabel: "HEY"

            }

        });
 
        ctx.onclick = function(e){
           var points = myLineChart.getElementsAtEvent(e);
           if(points[0]==undefined)
           return;
           console.log(points[0]);
           var point = points[0];
           point._yScale.options.scaleLabel;
           point._yScale.options.scaleLabel;
           console.log(point._yScale.options.scaleLabel);

        };

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
               


        

       $scope.handleYearChange = function(e) {
                var monthNode= document.getElementById("statMonth");
                var obj =[];
            var timePassed = _USER.timePassed;
             for(var i = 0; j<timePassed.length;i++){
                if(timePassed[i].year == e)
                obj = timePassed[i].months;
            }

           

            for(var j = 0; j<obj.length;j++){

                var option = document.createElement("option");
                option.value = obj.month[i].id;
                option.textContent = obj.month[i].name;
                
                monthNode.appendChild(option);

            }
                
       }
});