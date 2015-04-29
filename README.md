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
    container: ".container",
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

Items = new Mongo.Collection("items");
Items.insert({ title: "foo" });

Template.layout.helpers({
  items: function() {
    return Items.find();
  }
});

```

``` html
<template name="layout">
  <div class="container">
    {{#each items}}
      <div class="item">{{title}}</div>
    {{/each}}
  </div>
</template>
```
