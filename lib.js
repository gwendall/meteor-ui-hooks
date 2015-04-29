Template.prototype.uihooks = function(hooksAll) {
  var tpl = this;
  tpl.onRendered(function() {
    tpl = this;
    _.each(hooksAll, function(hooks, selector) {
      _.each(tpl.findAll(selector), function(el) {
        var $element = $(el);
        var parent = $element.parent().get(0);
        parent._uihooks = {
          insertElement: function(node, next) {
            if (!$(node).is(selector)) return;
            hooks.insert && hooks.insert.apply(this, [node, next]);
          },
          moveElement: function(node, next) {
            if (!$(node).is(selector)) return;
            hooks.move && hooks.move.apply(this, [node, next]);
          },
          removeElement: function(node) {
            if (!$(node).is(selector)) return;
            hooks.remove && hooks.remove.apply(this, [node]);
          }
        };
      });
    });
  });
};
