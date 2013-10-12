;(function() {
  var path = require('path'),
  fs = require('fs'),
  gui = require('nw.gui'),
  errorLog = path.join(gui.App.dataPath, '.error.log');

  if (!fs.existsSync(gui.App.dataPath)) {
    fs.mkdirSync(gui.App.dataPath);
  }

  process.on('uncaughtException', function(err) {

    var message = 
        ' Information | Description \n'
      + '-------------|-----------------------------\n'
      + ' Type        | UncaughtException \n'
      + ' Date        | '+ new Date +'\n'
      + ' Stack       | '+ err.stack +'\n\n'
      
    fs.appendFile(errorLog, '---uncaughtException---\n' + new Date +'\n'+ err.stack + '\n\n');
  });

  window.addEventListener('error', function(err) {
    var message = 
        ' Information | Description \n'
      + '-------------|-----------------------------\n'
      + ' Type        | Error\n'
      + ' Date        | '+ new Date +'\n'
      + ' File        | '+ err.filename.replace(process.cwd(), '') +'\n'
      + ' Line Number | '+ err.lineno +'\n'
      + ' Message     | '+ err.message +'\n\n'
      
    fs.appendFile(errorLog, message);
  }, false);
})(window);