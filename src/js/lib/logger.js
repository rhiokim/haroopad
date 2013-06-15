'use strict';

var path = require('path'),
  fs = require('fs'),
  userDataDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/.haroopad',
  errorLog = userDataDir + '/error.md';

if (!fs.existsSync(userDataDir)) {
  fs.mkdirSync(userDataDir);
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