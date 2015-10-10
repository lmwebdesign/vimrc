(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/startup/loadMenu.js                                          //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.startup(function () {                                           // 1
  if (Menu.find().count() === 0) {                                     // 2
    var menu = [{ 'name': 'QUESO-CHORIZO',                             // 3
      'desc': 'warm queso cooked with chorizo',                        // 5
      'price': 4.55 }, { 'name': 'QUESADILLAS',                        // 6
      'desc': 'mexican cheese quesadillas with grilled chicken',       // 8
      'price': 5.99 }, { 'name': 'BURRITO',                            // 9
      'desc': 'delicious rice and bean burrito',                       // 11
      'price': 3.95 }];                                                // 12
                                                                       //
    for (var i = 0; i < menu.length; i++) {                            // 15
      Menu.insert(menu[i]);                                            // 16
    }                                                                  //
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=loadMenu.js.map
