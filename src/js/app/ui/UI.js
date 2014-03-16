define([
    'db/DB',
    'db/Replicator',
    'ui/info/DBInfo',
    'ui/nav/Nav',
    'ui/list/ListApp',
    'ui/editor/Editor',
    'ui/viewer/Viewer'
  ], function(DB, Replicator, DBInfo, nav, listApp, editor, viewer) {

    // Replicator.sync();

    nav.on('new', function() {
      var data = { title: 'Untitled', create_at: new Date().getTime() };
      DB.post(data, function(err, response) {

        if (err) {
          throw err;
          return;
        }

        data._id = response.id;
        data._rev = response.rev;
        
        listApp.add(data);
      });
    });

    nav.on('save', function() {
      listApp.saveDoc();
    });

    nav.on('more', function() {
      listApp.more();
    });

    nav.on('sync', function() {
      Replicator.sync();
    });

    editor.on('change', function(txt) {
      listApp.updateDoc(txt);
    });

    listApp.on('select', function(doc) {
      editor.set(doc.get('markdown'));
    });

  });