// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('App', ['ionic','ngCordova'])



.run(function($ionicPlatform,$cordovaSQLite,_DB,_USER) {
  
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    // database settings
    var database = {
      name:"my.db",
      location:"default"
    };
     _DB.database = database;
    // starting database
     _DB.startDatabase();
    // setting rows length
     _DB.setRowsLength();
    // wait till everything is loaded, argument for time to wait
     _DB.showRegisterWindow(1000);
      //handling async function with callback
      if(_DB.rowsLength!=0)
         _DB.select(function(data){

            _USER.changeUserData(data.firstname,data.lastname,data.StartDate);
            if(!_USER.isNull)
            console.log("user data has been updated succesfully");
            
        });
        
      
        

     
  });
 

})

