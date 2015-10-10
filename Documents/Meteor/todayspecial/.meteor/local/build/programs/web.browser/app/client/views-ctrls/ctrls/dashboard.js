(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/views-ctrls/ctrls/dashboard.js                               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
angular.module('todayspecial').controller('dashboard', ['$scope', '$meteor', '$stateParams', function ($scope, $meteor, $stateParams) {
                                                                       //
    var errs = {                                                       // 5
        signin: false                                                  // 6
    };                                                                 //
    $scope.errors = errs;                                              // 8
                                                                       //
    $scope.login = function (data) {                                   // 10
        if (data != undefined) {                                       // 11
            if (data.email && data.password) {                         // 12
                Meteor.loginWithPassword(data.email, data.password, function (err) {
                    if (err.errork = 400 || err.error == 403) {        // 14
                        errs.signin = true;                            // 15
                    }                                                  //
                });                                                    //
            } else {                                                   //
                errs.signin = true;                                    // 19
            }                                                          //
        } else {                                                       //
            errs.signin = true;                                        // 22
        }                                                              //
    };                                                                 //
                                                                       //
    $scope.logout = function () {                                      // 26
        Meteor.logout();                                               // 27
    };                                                                 //
                                                                       //
    $scope.menu = $meteor.collection(Menu).subscribe('todayspecial');  // 30
                                                                       //
    $scope.addNewItem = function (item) {                              // 32
        Menu.insert(item);                                             // 33
    };                                                                 //
}]);                                                                   //
/////////////////////////////////////////////////////////////////////////

}).call(this);
