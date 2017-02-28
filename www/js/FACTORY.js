angular.module("App")

.factory("_USER",function(){
    var obj = {
        fname         : "",
        lname         : "",
        StartDate     : null,
        timePassed    : [
            //EXAMPLE
                        // year:2014,
                        // months:[
                        //    month:{
                        //     name:April,
                        //     id:4,
                        //     days:31
                        // }],
                        // 
        ],
        isNull        : true,
        fullName      : function(){
            return this.fname + " " + this.lname;
        },
        changeUserData: function(fname,lname,StartDate,data){
            
                this.fname = fname;            
                this.lname = lname;
                this.StartDate = StartDate;
                this.funds = JSON.parse(data);

            if((obj.fname && obj.lname)!="")
                obj.isNull = false;
        },

        //the main funds object
        funds         :{

           startBalance:0,
            currBalance:0,
             startDate :{year:null,month:null,day:null},
               currDate:{year:null,month:null,day:null},
                  data :[
                /* {
                      date:{year:null,month:null,day:null},
                    balace:null,
                   dayData:[
                       {
                        balanceChange:null,
                        time:null,
                        item:""
                       }
                         
                   ]
                      
                 }*/
            ]

        },
      firstTimeInit:function(){
          //sets up start date
            var year  = new Date().getFullYear();
            var month = new Date().getMonth()+1;
            var day   = new Date().getDate();
            
            obj.funds.startDate = {year:year,month:month,day:day};
        },
        setUpData:function(){
            //just sets up current date
            var year  = new Date().getFullYear();
            var month = new Date().getMonth()+1;
            var day   = new Date().getDate();
            
            obj.funds.currDate = {year:year,month:month,day:day};
        },
        insertFunds:function(moneyAdded){

        },
        removeFunds:function(moneyRemoved){

        },
        calculateTimePassed:function(){
            //takes all the data from obj.funds;
            var start = obj.funds.startDate;
            var curr  = obj.funds.currDate;
            var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November","December"];
            // yearsPassed = curr.year - start.year;
            // var months  = yearsPassed * 12;
            // months+= curr.month - start.month;
            var allTimeTillToday = [];
            var cnt = 0;
            //loop through all the years
            for(var i = start.year; i<=curr.year; i++){
                //creating object which will hold all of the one years months and days
                allTimeTillToday.push({
                    year:i,
                    months:[]
                });
                if(i == curr.year)
                for(var j = 0;j<=curr.month-1;j++){
                    //if its current year loop till its the day of the month we need
                    //getting current day of the month
                    if(curr.month-1 == j)
                        var countDays = new Date().getDate();
                    else
                        var countDays = new Date(i,j,0).getDate();
                    allTimeTillToday[cnt].months.push({
                            
                           
                                name:monthNames[j],
                                id:j,
                                days:countDays
                            
                    });
                    
                   
                }
                else
                for(var j = 0;j<=11;j++){
                    //getting day count
                    var countDays = new Date(i,j,0).getDate();
                   allTimeTillToday[cnt].months.push({

                                name:monthNames[j],
                                id:j,
                                days:countDays
                            
                    });               
            }

        cnt++;

        }
        
        obj.timePassed = allTimeTillToday;
        
    }//end of function
    //
} //end of funds
    //
    return obj;
})//end of controoler

// database

.factory("_DB",function($cordovaSQLite,_USER){
    console.log("initializing database factory");
    var obj = {
        dbName      :"",
        db          :null,
        database    :null,
        rowsLength  :null
    };
       obj.setdb  = function(db){
           this.db = db;
       }

       obj.insert = function (firstname, lastname, StartDate, data) {
            if(obj.rowsLength!=0)
                return;
           var query = "INSERT INTO User (firstname, lastname, StartDate, data) VALUES (?,?,?,?)";
           $cordovaSQLite.execute(obj.db, query, [firstname, lastname, StartDate,JSON.stringify(_USER.funds)]).then(function (res) {
               console.log("\n ADDED ->" + res.insertId);
           }, function (err) {
               console.error(JSON.stringify(err));
           });

           obj.setRowsLength();
       }
       obj.select = function (_callback) {
          
           var query = "SELECT firstname ,lastname, StartDate, data FROM User";
           $cordovaSQLite.execute(obj.db, query).then(function (res) {
               if (res.rows.length > 0) {
                   console.log("\nSELECTED ->" + res.rows.item(0).firstname + " " + res.rows.item(0).lastname+" "+ res.rows.item(0).StartDate);
                   //mind blown
                _callback(res.rows.item(0));
                
               }
               else {
                   console.log("\n didn't find any matching user");
               }
           },function(err){
                console.error("\n err");
           });
           
       }
        obj.update = function(){
        var data = JSON.stringify(_USER.funds);
        var query = "UPDATE User set data = '"+ data +"' WHERE firstname = '"+ _USER.fname + "'";
        $cordovaSQLite.execute(obj.db,query).then(function(res){

                console.log("\n\nUpdated database succesfully");

        },function(err){
                console.error("database was not updated:\n"+err);
        });
    }

       obj.setRowsLength = function(){
           var query = "SELECT * FROM User" ;
           $cordovaSQLite.execute(obj.db,query).then(function(res){
               
                // for(var i =0;i<res.rows.length;i++)
                //     console.log(JSON.stringify(res.rows.item(i))+"\n");         
                    obj.rowsLength = res.rows.length;
                
           }, function(err){
                    console.error(err.message);
           });
           
           
       }

       obj.removeDatabase = function(){
          window.sqlitePlugin.deleteDatabase({name: obj.dbName, location: 'default'}, function(succ){
              console.log("DatabaseDelete - "+succ);
              obj.db = null;
              obj.setRowsLength();
          }, function(err){
              console.error(err);
          });
                
       }

       obj.startDatabase = function(){
            obj.dbName = obj.database.name;
        
            //
            try {
                var db = $cordovaSQLite.openDB(obj.database);
                $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS User (firstname text, lastname text, StartDate text, data text)").then(function (res) {
                    console.log("CREATING_TABLE - " + JSON.stringify(res));

                }, function (err) {
                    console.error(err);
                });
                obj.setdb(db);
                

                console.log("database was created succesfully");
                //Log.d("test", "database created");
            }
            catch (e) {
                console.log("database was not created\n" + e);

                //Log.d("test", "database not created");
            }
       }

       obj.showRegisterWindow = function(time){
           if(time == undefined)
            time = 50;
            setTimeout(function(){
                if(obj.db == null)
                        obj.startDatabase(obj.database);
                if(obj.rowsLength==0)
                        window.location.href = window.location.pathname + "#/register";
                else
                    console.log("user is registered");

                },time);
       }

    return obj;
})

.factory("_Loading",function($ionicLoading){
    var obj = {

        show:function() {
                $ionicLoading.show({
                        template: 'Loading...'
                }).then(function () {
                        console.log("The loading indicator is now displayed");
                });
        },

        hide:function () {
                $ionicLoading.hide().then(function () {
                        console.log("The loading indicator is now hidden");
                });
        }

    };

    return obj
})