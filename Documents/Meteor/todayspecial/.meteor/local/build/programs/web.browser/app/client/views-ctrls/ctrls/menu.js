(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/views-ctrls/ctrls/menu.js                                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
angular.module('todayspecial').controller('menu', ['$scope', '$meteor', '$stateParams', function ($scope, $meteor, $stateParams) {
                                                                       //
        $scope.menu = $meteor.collection(Menu).subscribe('todayspecial');
}]);                                                                   //
/////////////////////////////////////////////////////////////////////////

}).call(this);
