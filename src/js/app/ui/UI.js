define([
    'ui/db/DB',
    'ui/info/DBInfo',
    'ui/nav/Nav',
    'ui/list/ListApp',
    'ui/editor/Editor',
    'ui/viewer/Viewer'
  ], function(DB,DBInfo, nav, listApp, editor, viewer) {

    nav.on('new', function() {
      var data = { title: 'Untitled', create_at: new Date() };
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

    nav.on('more', function() {
      listApp.more();
    });

    editor.on('change', function(txt) {
      listApp.updateDoc(txt);
    });

    listApp.on('select', function(doc) {
      console.log('select', doc.toJSON());

      editor.set(doc.get('markdown'));
    });
  });