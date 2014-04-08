// An example Backbone application contributed by
// [Jérôme Gravel-Niquet](http://jgn.me/).
// This demo shows the use of the
// [PouchDB adapter](backbone-pouchdb.js)
// to persist Backbone models within your browser
// and to be able to replicate the data to and from a server.

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){
  var dbname = 'todos-sync-backbone-0.0.12';

  // Save all of the todo items in the `"todos-backbone"` database.
  Backbone.sync = BackbonePouch.sync({
    // We currently suffix by the PouchDB version here
    // because at the moment PouchDB does not support upgrade
    db: Pouch(dbname),
    listen: true,
    fetch: 'query'
  });

  // Adjust id attribute to the one PouchDB uses
  Backbone.Model.prototype.idAttribute = '_id';

  // Todo Model
  // ----------

  // Our basic **Todo** model has `title`, `order`, and `done` attributes.
  var Todo = Backbone.Model.extend({

    // Default attributes for the todo item.
    defaults: function() {
      return {
        type: 'todo',
        title: "empty todo...",
        order: Todos.nextOrder(),
        done: false
      };
    },

    // Ensure that each todo created has `title`.
    initialize: function() {
      if (!this.get("title")) {
        this.set({"title": this.defaults.title});
      }
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    },

    // Remove this Todo from *PouchDB* and delete its view.
    clear: function() {
      this.destroy();
    }
  });

  // Todo Collection
  // ---------------

  // The collection of todos is backed by *PouchDB* instead of a remote
  // server.
  var TodoList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Todo,

    // Include todos in Map Reduce response. Order by `order`.
    pouch: {
      options: {
        query: {
          include_docs: true,
          fun: {
            map: function(doc) {
              if (doc.type === 'todo') {
                emit(doc.order, null);
              }
            }
          }
        },
        changes: {
          include_docs: true,
          filter: function(doc) {
            return doc._deleted || doc.type === 'todo';
          }
        }
      }
    },

    // parse view result, use doc property injected via `include_docs`
    parse: function(result) {
      return _.pluck(result.rows, 'doc');
    },

    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.filter(function(todo){ return todo.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(todo) {
      return todo.get('order');
    }

  });

  // Create our global collection of **Todos**.
  var Todos = new TodoList;

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  var TodoView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .toggle"   : "toggleDone",
      "dblclick .view"  : "edit",
      "click a.destroy" : "clear",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "close"
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    // Re-render the titles of the todo item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('done', this.model.get('done'));
      this.$el.toggleClass('conflicts', _.size(this.model.get('_conflicts')) > 0);
      this.input = this.$('.edit');
      return this;
    },

    // Toggle the `"done"` state of the model.
    toggleDone: function() {
      this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      var value = this.input.val();
      if (!value) this.clear();
      this.model.save({title: value});
      this.$el.removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.clear();
    }

  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#todoapp"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#stats-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-todo":  "createOnEnter",
      "click #clear-completed": "clearCompleted",
      "click #toggle-all": "toggleAllComplete"
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *PouchDB*.
    initialize: function() {

      this.input = this.$("#new-todo");
      this.allCheckbox = this.$("#toggle-all")[0];

      Todos.bind('add', this.addOne, this);
      Todos.bind('reset', this.addAll, this);
      Todos.bind('all', this.render, this);

      this.stats = this.$('#stats');
      this.main = $('#main');

      Todos.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function(e, a) {
      var done = Todos.done().length;
      var remaining = Todos.remaining().length;

      if (Todos.length) {
        this.main.show();
        this.stats.show();
        this.stats.html(this.statsTemplate({done: done, remaining: remaining}));
      } else {
        this.main.hide();
        this.stats.hide();
      }

      this.allCheckbox.checked = !remaining;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
      var view = new TodoView({model: todo});
      this.$("#todo-list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      Todos.each(this.addOne);
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *PouchDB*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;

      Todos.create({title: this.input.val()}, { wait: true });
      this.input.val('');
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      _.each(Todos.done(), function(todo){ todo.clear(); });
      return false;
    },

    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      Todos.each(function (todo) { todo.save({'done': done}); });
    }
  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;


  // Replication Model
  // -----------------

  // Our **Replication** model has an `url` attribute.
  var Replication = Backbone.Model.extend({
    defaults: {
      type: 'replication'
    }
  });

  // Replication Collection
  // ----------------------

  var ReplicationList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Replication,

    // Include replications in Map Reduce response. Order by `url`.
    pouch: {
      options: {
        query: {
          include_docs: true,
          fun: {
            map: function(doc) {
              if (doc.type === 'replication') {
                emit(doc.url, null);
              }
            }
          }
        },
        changes: {
          include_docs: true,
          filter: function(doc) {
            return doc._deleted || doc.type === 'replication';
          }
        }
      }
    },

    // parse view result, use doc property injected via `include_docs`
    parse: function(result) {
      return _.pluck(result.rows, 'doc');
    },

    // Replications are sorted by url.
    comparator: function(replication) {
      return replication.get('url');
    }

  });

  // Create global collection of **Replications**.
  var Replications = new ReplicationList;


  // Replication Item View
  // ---------------------

  // The DOM element for a replication item...
  var ReplicationView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#replication-item-template').html()),

    // The DOM events specific to an item.
    events: {
      "click a.destroy" : "clear"
    },

    // The ReplicationView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Replication** and a **ReplicationView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    // Re-render the titles of the replication item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }

  });

  // The Application
  // ---------------

  // Our overall **ReplicationAppView** is the top-level piece of UI.
  var ReplicationAppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#sync-app"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#sync-stats-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-replication":  "createOnEnter"
    },

    // At initialization we bind to the relevant events on the `Replications` and `Replications`
    // collections, when items are added or changed. Kick things off by
    // loading any preexisting replications and replications that might be saved in *PouchDB*.
    initialize: function() {
      this.pushResps = {};
      this.pullResps = {};

      this.input = this.$("#new-replication");

      Replications.bind('add', this.addOne, this);
      Replications.bind('reset', this.addAll, this);
      Replications.bind('all', this.render, this);

      this.stats = this.$('#sync-stats');
      this.main = $('#sync-main');

      Replications.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      if (Replications.length) {
        this.main.show();
        this.renderStats();
        this.stats.show();
      } else {
        this.main.hide();
        this.stats.hide();
      }
    },

    renderStats: function() {
      var stats = {
        read: _.reduce(this.pullResps, function(sum, resp) {
          return sum + resp.docs_written;
        }, 0),
        written: _.reduce(this.pushResps, function(sum, resp) {
          return sum + resp.docs_written;
        }, 0),
        count: Replications.length
      };

      this.stats.html(this.statsTemplate(stats));
    },

    // Add a single replication item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(replication) {
      var view = new ReplicationView({model: replication});
      this.$("#replication-list").append(view.render().el);
      this.replicate(replication);
    },

    // Add all items in the **Replications** collection at once.
    addAll: function() {
      Replications.each(this.addOne, this);
    },

    // If you hit return in the main input field, create new **Replication** model,
    // persisting it to *PouchDB*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;

      Replications.create({url: this.input.val()});
      this.input.val('');
    },

    replicate: function (model) {
      var url = model.get('url'),
          pushResps = this.pushResps,
          pullResps = this.pullResps,
          renderStats = _.bind(this.renderStats, this);

      Pouch.replicate(dbname, url, {
        continuous: true,
        onChange: function(resp) {
          pushResps[url] = resp;
          renderStats();
        }
      });
      Pouch.replicate(url, dbname, {
        continuous: true,
        onChange: function(resp) {
          pullResps[url] = resp;
          renderStats();
        }
      });
    }

  });

  // Finally, we kick things off by creating the **App**.
  var ReplicationApp = new ReplicationAppView;
});
