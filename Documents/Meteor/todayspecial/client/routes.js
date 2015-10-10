angular.module('todayspecial')
    .config(['$urlRouterProvider','$stateProvider','$locationProvider',
        function($urlRouterProvider,$stateProvider,$locationProvider){

            $locationProvider.html5Mode(true);

            $stateProvider
                .state('dashboard',{
                    url:'/dashboard',
                    templateUrl:'client/views-ctrls/views/dashboard.ng.html',
                    controller:'dashboard'
                })
                .state('menu',{
                    url:'/',
                    templateUrl:'client/views-ctrls/views/menu.ng.html',
                    controller:'menu'
                });

            $urlRouterProvider.otherwise('/');
}]);
