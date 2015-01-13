'use strict';
var path = require('path');
var userHome = require('user-home');
var env = process.env;

exports.data = env.XDG_DATA_HOME || path.join(userHome, '.local', 'share');

exports.config = env.XDG_CONFIG_HOME || path.join(userHome, '.config');

exports.cache = env.XDG_CONFIG_HOME || path.join(userHome, '.cache');

exports.runtime = env.XDG_RUNTIME_DIR;

exports.dataDirs = (env.XDG_DATA_DIRS || '/usr/local/share/:/usr/share/').split(':');
exports.dataDirs.unshift(exports.data);

exports.configDirs = (env.XDG_CONFIG_DIRS || '/etc/xdg').split(':');
exports.configDirs.unshift(exports.config);
