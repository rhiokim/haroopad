// for Memory leak detect
process.setMaxListeners(0);

//add node main module path
process.mainModule.paths = [getExecPath() +'Libraries/.node_modules'].concat(process.mainModule.paths);
