Template.prototype.uihooks = function(hooksAll) {
  var tpl = this;
  tpl.onRendered(function() {
    if (!tpl.viewName) return;
    tpl = this;
    var tplContainer = $(tpl.firstNode.parentNode);
    _.each(hooksAll, function(hooks, selector) {
      var declaredContainer = hooks.container && $(hooks.container);
      var itemsContainer = tpl.$(selector).length && tpl.$(selector).first().parent();
      var container = declaredContainer || itemsContainer || tplContainer;
      $(container).each(function() {
        this._uihooks = {
          insertElement: function(node, next) {
            if (!$(node).is(selector)) return $(node).insertBefore(next);
            hooks.insert && hooks.insert.apply(this, [node, next, tpl]);
          },
          moveElement: function(node, next) {
            if (!$(node).is(selector)) return;
            hooks.move && hooks.move.apply(this, [node, next, tpl]);
          },
          removeElement: function(node) {
            if (!$(node).is(selector)) return $(node).remove();
            hooks.remove && hooks.remove.apply(this, [node, tpl]);
          }
        };
      });
    });
  });
};
