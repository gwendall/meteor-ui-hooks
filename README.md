Meteor UI Hooks
===============

A more simple API for Blaze \_uihooks

Installation  
------------

``` sh
meteor add gwendall:ui-hooks
```

Methods
----------

**Template[tplName].uihooks(hooks)**  
Set the insert, move, remove as you would do with vanilla \_uihooks.

Example
-------  

``` javascript
Template.layout.uihooks({
  ".item": {
    insert: function(node, next) {
      console.log("Inserting an item.");
      $(node).insertBefore(next);
    },
    move: function(node, next) {
      console.log("Moving an item.");
    },
    remove: function(node) {
      console.log("Removing an item.");
      $(node).remove();
    }
  }
});
```
