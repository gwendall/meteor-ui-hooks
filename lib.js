var insertNode = function(node, next, container) {
  if (next) {
    $(node).insertBefore(next);
  } else {
    $(container).append(node);
  }
};

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
            if ($(node).is(selector)) {
              hooks.insert && hooks.insert.apply(this, [node, next, tpl]);
            } else {
              insertNode(node, next, container);
            }
          },
          removeElement: function(node) {
            if ($(node).is(selector)) {
              hooks.remove && hooks.remove.apply(this, [node, tpl]);
            } else {
              $(node).remove();
            }
          },
          moveElement: function(node, next) {
            if ($(node).is(selector)) {
              hooks.move && hooks.move.apply(this, [node, next, tpl]);
            } else {
              $(node).remove();
              insertNode(node, next, container);
            }
          }
        };
      });
    });
  });
};
