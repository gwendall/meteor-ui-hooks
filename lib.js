var defaultHooks = {
  insert: function(node, next, container) {
    if (next) {
      $(node).insertBefore(next);
    } else {
      $(container).append(node);
    }
  },
  move: function(node, next, container) {
    defaultHooks.remove(node);
    defaultHooks.insert(node, next, container);
  },
  remove: function(node) {
    $(node).remove();
  },
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
              defaultHooks.insert(node, next, container);
            }
          },
          removeElement: function(node) {
            if ($(node).is(selector)) {
              hooks.remove && hooks.remove.apply(this, [node, tpl]);
            } else {
              defaultHooks.remove(node, container);
            }
          },
          moveElement: function(node, next) {
            if ($(node).is(selector)) {
              hooks.move && hooks.move.apply(this, [node, next, tpl]);
            } else {
              defaultHooks.move(node, container);
            }
          }
        };
      });
    });
  });
};
