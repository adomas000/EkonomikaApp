angular.module("App")

.factory("_USER",function(){
    var obj = {
        name          : "",
        lname         : "",
        StartDate     : null,
        isNull        : true,
        fullName      : function(){
            return this.name + " " + this.lname;
        },
        changeUserData: function(name,lname,StartDate){
            if(arguments.length==1)
                this.name  = name;
            else if(arguments.length==2)
                this.lname = lname;
            else
                this.StartDate = StartDate;
        }
    };
    //
    
    //
    return obj;
})

// database

.factory("_DB",function($cordovaSQLite){
    console.log("initializing database factory");
    var obj = {
        dbName:"",
        db:null
    };
       obj.setdb  = function(db){
           this.db = db;
       }

       obj.insert = function (firstname, lastname, StartDate) {
           var query = "INSERT INTO User (firstname, lastname, StartDate) VALUES (?,?,?)";
           $cordovaSQLite.execute(obj.db, query, [firstname, lastname, StartDate]).then(function (res) {
               console.log("\n ADDED ->" + res.insertId);
           }, function (err) {
               console.error(err);
           });

       }
       obj.select = function (lastname, StartDate) {
           var query = "SELECT firstname ,lastname, StartDate FROM User WHERE lastname = ? and StartDate = ?";
           $cordovaSQLite.execute(obj.db, query, [lastname, StartDate]).then(function (res) {
               if (res.rows.length > 0) {
                   console.log("\nSELECTED ->" + res.rows.item(0).firstname + res.rows.item(0).lastname);
               }
               else {
                   console.log("\n didn't find any matching user");
               }
           },function(err){
                console.error("\n err");
           });

       }
       obj.showTableData = function(){
           var query = "SELECT * FROM User" ;
           $cordovaSQLite.execute(obj.db,query).then(function(res){
               for(var i =0;i<res.rows.length;i++)
                    console.log(JSON.stringify(res.rows.item(i))+"\n");
           }, function(err){
                    console.error(err.message);
           });
       }

       obj.removeDatabase = function(){
          window.sqlitePlugin.deleteDatabase({name: obj.dbName, location: 'default'}, function(succ){
              console.log("DatabaseDelete - "+succ);
          }, function(err){
              console.error(err);
          });
          
       
         
       }

    return obj;
});