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
});