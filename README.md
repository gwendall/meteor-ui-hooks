Meteor UI Hooks
===============

A simpler API for Blaze \_uihooks

Installation  
------------

``` sh
meteor add gwendall:ui-hooks
```

Methods
----------

**Template[tplName].uihooks(hooks)**  
Set the insert, move, remove as you would do with vanilla \_uihooks. Optionally pass the container of the items you want to look at (recommended).

Example
-------  

``` javascript

Template.layout.uihooks({
  '.item': {
    container: '.container',
    insert: function(node, next, tpl) {
      console.log('Inserting an item.');
      $(node).insertBefore(next);
    },
    move: function(node, next, tpl) {
      console.log('Moving an item.');
    },
    remove: function(node, tpl) {
      console.log('Removing an item.');
      $(node).remove();
    }
  }
});
```

This is it. With this much simpler syntax, you can now play with UI hooks as you would do traditionally.  
Some more code for the complete example, should you need it.

``` javascript
Items = new Mongo.Collection('items');
Items.insert({ title: 'foo' });

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
