"use strict";

exports.test = function () {
    return  global.setImmediate;
};

exports.install = function (t) {
    return function () {
        setTimeout(t, 0);
    };
};
