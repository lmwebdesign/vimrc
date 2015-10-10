(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/app.js                                                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
angular.module('todayspecial', ['angular-meteor', 'ui.router']);       // 1
                                                                       //
function onReady() {                                                   // 3
    angular.bootstrap(document, ['todayspecial']);                     // 4
}                                                                      //
                                                                       //
if (Meteor.isCordova) {                                                // 7
    angular.element(document).on('deviceready', onReady);              // 8
} else {                                                               //
    angular.element(document).ready(onReady);                          // 11
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
