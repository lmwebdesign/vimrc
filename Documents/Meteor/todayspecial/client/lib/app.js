angular.module('todayspecial',['angular-meteor','ui.router']);

function onReady(){
    angular.bootstrap(document,['todayspecial']);
}

if (Meteor.isCordova){
    angular.element(document).on('deviceready',onReady);
}
else{
    angular.element(document).ready(onReady);
}
