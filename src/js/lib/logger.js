;(function() {
  var path = require('path'),
  fs = require('fs-extra'),
  moment = require('moment'),
  gui = require('nw.gui'),
  errDir = path.join(gui.App.dataPath, '.error', moment().format('YYYY/MM'));
  errFile = path.join(errDir, moment().format('DD') +'.log');

  fs.mkdirsSync(errDir);
  
  process.on('userException', function(message) {
    var message = 
        ' Information | Description \n'
      + '-------------|-----------------------------\n'
      + ' Type        | userException \n'
      + ' Date        | '+ new Date +'\n'
      + ' Stack       | '+ message +'\n\n'
      
    fs.appendFile(errFile, message);
  });

  process.on('uncaughtException', function(err) {
    var message =  
        ' Information | Description \n'
      + '-------------|-----------------------------\n'
      + ' Type        | UncaughtException \n'
      + ' Date        | '+ new Date +'\n'
      + ' Stack       | '+ err.stack +'\n\n'
      
    fs.appendFile(errFile, message);
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
      
    fs.appendFile(errFile, message);
  }, false);

})(window);