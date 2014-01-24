define([],function() {
  var fs = require('fs-extra');
  var readDir = require('readdir');
  var path = require('path');
  var gui = require('nw.gui');
  var files, isExist, source, dest;

  var editorSource = global.PATHS.theme_res_editor;
  var markdownSource = global.PATHS.theme_res_viewer;

  var editorDest = global.PATHS.theme_dest_editor;
  var markdownDest = global.PATHS.theme_dest_viewer;

  fs.mkdirpSync(editorDest);
  fs.mkdirpSync(markdownDest);

  files = readDir.readSync(editorSource, [ '**.css' ]);
  
  files.forEach(function(file) {
    dest = path.join(editorDest, file);
    source = path.join(editorSource, file);

    isExist = fs.existsSync(dest);

    if (!isExist) {
      try {
        fs.copySync(source, dest);
      } catch (e) {}
    } 

  });
  
  files = readDir.readSync(markdownSource, [ '**.css' ]);
  
  files.forEach(function(file) {
    dest = path.join(markdownDest, file);
    source = path.join(markdownSource, file);

    isExist = fs.existsSync(dest);

    if (!isExist) {
      try {
        fs.copySync(source, dest);
      } catch (e) {}
    }

  });
  
});