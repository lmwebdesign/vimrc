(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// model/collection.js                                                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Menu = new Mongo.Collection('todayspecial');                           // 1
                                                                       //
Menu.allow({                                                           // 3
    insert: function (userId, item) {                                  // 4
        return userId === userId;                                      // 5
    },                                                                 //
    update: function (userId, item, fields, modifier) {                // 7
        return true;                                                   // 8
    },                                                                 //
    remove: function (userId, item) {                                  // 10
        return userId && item.owner == userId;                         // 11
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
