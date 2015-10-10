angular.module('todayspecial')
        .controller('dashboard',['$scope','$meteor','$stateParams',
                function($scope,$meteor,$stateParams){

                    var errs = {
                        signin:false
                    };
                    $scope.errors = errs;

                    $scope.login = function(data){
                        if(data != undefined){
                            if(data.email && data.password){
                                Meteor.loginWithPassword(data.email,data.password,function(err){
                                    if(err.errork=400 || err.error==403){
                                        errs.signin=true
                                    }
                                });
                            }else{
                                errs.signin=true
                            }
                        }else{
                           errs.signin=true
                        }
                    }

                    $scope.logout = function(){
                        Meteor.logout();
                    };

                    $scope.menu = $meteor.collection(Menu).subscribe('todayspecial');

                    $scope.addNewItem = function(item){
                        Menu.insert(item);
                    }

                }
        ]);

