Menu = new Mongo.Collection('todayspecial');

Menu.allow({
    insert: function (userId, item){
        return userId === userId;
            },
    update: function (userId, item, fields, modifier){
        return true;
            },
    remove: function (userId, item){
        return userId && item.owner == userId;
            }
});

