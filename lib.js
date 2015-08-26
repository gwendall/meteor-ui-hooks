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
  }
};

var allFalse = function(array) {
  var hasOnlyFalse = true;
  array.forEach(function(item) {
    if (item) return hasOnlyFalse = false;
  });
  return hasOnlyFalse;
};

var makeHook = function(hooks, defaultCallback) {
  return function() {
    var args = arguments;
    var hooksResults = [];
    var self = this;
    hooks.forEach(function(hook) {
      hooksResults.push(hook.apply(self, args));
    });
    if (!defaultCallback) return;
    if (allFalse(hooksResults)) {
      return defaultCallback.apply(self, args);
    }
  }
};

Template.prototype.uihooks = function(hooksAll) {
  var tpl = this;
  tpl.onRendered(function() {
    if (!tpl.viewName) return;
    tpl = this;
    var tplContainer = $(tpl.firstNode.parentNode);
    for (var selector in hooksAll) {
      var hooks = hooksAll[selector];
      var declaredContainer = hooks.container && $(hooks.container);
      var itemsContainer = tpl.$(selector).length && tpl.$(selector).first().parent();
      var container = declaredContainer || itemsContainer || tplContainer;
      $(container).each(function() {

        if (!this._alluihooks) {
          this._alluihooks = {
            insert: [],
            move: [],
            remove: []
          };
          if (this._uihooks) {
            if (this._uihooks.insertElement) this._alluihooks.insert.push(this._uihooks.insertElement);
            if (this._uihooks.moveElement) this._alluihooks.move.push(this._uihooks.moveElement);
            if (this._uihooks.removeElement) this._alluihooks.remove.push(this._uihooks.removeElement);
          }
        }

        this._alluihooks.insert.push(function(node, next) {
          if (!$(node).is(selector)) return false;
          hooks.insert && hooks.insert.apply(this, [node, next, tpl]);
          return true;
        });

        this._alluihooks.move.push(function(node, next) {
          if (!$(node).is(selector)) return false;
          hooks.move && hooks.move.apply(this, [node, next, tpl]);
          return true;
        });

        this._alluihooks.remove.push(function(node) {
          if (!$(node).is(selector)) return false;
          hooks.remove && hooks.remove.apply(this, [node, tpl]);
          return true;
        });

        var self = this;
        this._uihooks = {
          insertElement: makeHook(this._alluihooks.insert, function(node, next) {
            return defaultHooks.insert(node, next, self);
          }),
          moveElement: makeHook(this._alluihooks.move, function(node, next) {
            return defaultHooks.move(node, next, self);
          }),
          removeElement: makeHook(this._alluihooks.remove, function(node) {
            return defaultHooks.remove(node);
          })
        };

      });
    }
  });
};
