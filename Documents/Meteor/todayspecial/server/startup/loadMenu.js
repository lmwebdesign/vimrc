Meteor.startup(function(){
    if(Menu.find().count() === 0){
        var menu = [
            {'name':'QUESO-CHORIZO',
             'desc':'warm queso cooked with chorizo',
             'price': 4.55},
            {'name':'QUESADILLAS',
             'desc':'mexican cheese quesadillas with grilled chicken',
             'price': 5.99},
            {'name':'BURRITO',
             'desc':'delicious rice and bean burrito',
             'price': 3.95}
            ];

        for(var i=0; i<menu.length; i++){
            Menu.insert(menu[i]);
        }
     }
});
