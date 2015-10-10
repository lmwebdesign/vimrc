Meteor.publish('todayspecial', function(){
    return Menu.find();
});
