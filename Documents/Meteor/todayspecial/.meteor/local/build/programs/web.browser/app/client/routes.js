(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/routes.js                                                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
angular.module('todayspecial').config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function ($urlRouterProvider, $stateProvider, $locationProvider) {
                                                                       //
    $locationProvider.html5Mode(true);                                 // 5
                                                                       //
    $stateProvider.state('dashboard', {                                // 7
        url: '/dashboard',                                             // 9
        templateUrl: 'client/views-ctrls/views/dashboard.ng.html',     // 10
        controller: 'dashboard'                                        // 11
    }).state('menu', {                                                 //
        url: '/',                                                      // 14
        templateUrl: 'client/views-ctrls/views/menu.ng.html',          // 15
        controller: 'menu'                                             // 16
    });                                                                //
                                                                       //
    $urlRouterProvider.otherwise('/');                                 // 19
}]);                                                                   //
/////////////////////////////////////////////////////////////////////////

}).call(this);
