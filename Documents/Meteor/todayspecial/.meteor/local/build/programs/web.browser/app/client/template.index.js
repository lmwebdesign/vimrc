(function(){
Template.body.addContent((function() {
  var view = this;
  return HTML.Raw('<div ui-view=""></div>');
}));
Meteor.startup(Template.body.renderToDocument);

Meteor.startup(function() { $('body').attr({"ng-app":"todayspecial"}); });

}).call(this);
