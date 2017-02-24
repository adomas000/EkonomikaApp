angular.module("App")

.factory("_USER",function(){
    var obj = {
        fname         : "",
        lname         : "",
        StartDate     : null,
        isNull        : true,
        fullName      : function(){
            return this.fname + " " + this.lname;
        },
        changeUserData: function(fname,lname,StartDate){
            
                this.fname = fname;            
                this.lname = lname;
                this.StartDate = StartDate;

            if((obj.fname && obj.lname)!="")
                obj.isNull = false;
        }
    };
    //
    
    //
    return obj;
})

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

       obj.insert = function (firstname, lastname, StartDate) {
            if(obj.rowsLength!=0)
                return;
           var query = "INSERT INTO User (firstname, lastname, StartDate) VALUES (?,?,?)";
           $cordovaSQLite.execute(obj.db, query, [firstname, lastname, StartDate]).then(function (res) {
               console.log("\n ADDED ->" + res.insertId);
           }, function (err) {
               console.error(err);
           });

           obj.setRowsLength();
       }
       obj.select = function (_callback) {
          
           var query = "SELECT firstname ,lastname, StartDate FROM User";
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
                $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS User (firstname text, lastname text, StartDate text)").then(function (res) {
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
});