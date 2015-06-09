var allFalse = function(array) {
  var outcome = true;
  array.forEach(function(elm){
    if(elm) return outcome = false;
  });
  return outcome;
};

var makeHook = function(hooks, defaultCallback) {
  return function() {
    var args = arguments;
    var outcome = [];
    var self = this;
    hooks.forEach(function(hook){
      outcome.push(hook.apply(self, args));
    });
    if (!defaultCallback) return;
    if (allFalse(outcome)) {
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
    _.each(hooksAll, function(hooks, selector) {
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

        this._uihooks = {
          insertElement: makeHook(this._alluihooks.insert, function(node, next) {
            return $(node).insertBefore(next);
          }),
          moveElement: makeHook(this._alluihooks.move),
          removeElement: makeHook(this._alluihooks.remove, function(node) {
            return $(node).remove();
          })
        };
      });
    });
  });
};
