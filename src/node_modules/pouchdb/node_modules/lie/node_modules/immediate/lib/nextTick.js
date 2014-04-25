"use strict";
exports.test = function () {
    // Don't get fooled by e.g. browserify environments.
    return process && !process.browser;
};

exports.install = function (func) {
    if (typeof global.setImmediate === "function") {
        return function () {
            global.setImmediate(func);
        };
    } else {
        return function () {
            process.nextTick(func);
        };
    }
};