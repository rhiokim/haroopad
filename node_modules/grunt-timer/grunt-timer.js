var duration = require("duration"),
    colour = require("bash-color");

exports = module.exports = (function () {
    "use strict";
    var timer = {}, grunt, hooker, last, task,
        total = 0,
        deferLogs = false,
        friendlyTime = false,
        deferredMessages = [];

    var getDisplayTime = function (s) {
        if (!friendlyTime) {
            return s + "ms";
        }
        if (s < 1000) {
            return "<1 second";
        }

        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        return (hrs ? hrs + (hrs > 1 ? " hours " : " hour ") : "") +
                (mins ? mins + (mins > 1 ? " minutes " : " minute ") : "") +
                secs + (secs > 1 ? " seconds " : " second ");
    };

    var logCurrent = function () {
        var dur = new duration(last).milliseconds;
        if (dur > 2) {
            var logMsg = "Task '" + task + "' took " + getDisplayTime(dur);
            if (deferLogs) {
                deferredMessages.push(logMsg);
            } else {
                grunt.log.writeln(colour.purple(logMsg));
            }
            addToTotal(dur);
        }
    };

    var logTotal = function () {
        grunt.log.writeln(colour.purple("All tasks took " + getDisplayTime(total), true));
    };

    var addToTotal = function (ms) {
        total = total + ms;
    };

    timer.init = function (_grunt, options) {
        grunt = _grunt;
        hooker = grunt.util.hooker;
        total = 0;
        options = options || {};

        deferLogs = !!options.deferLogs;
        friendlyTime = !!options.friendlyTime;

        hooker.hook(grunt.log, "header", function () {
            if (!task) {
                last = new Date();
                task = grunt.task.current.nameArgs;
            }
            if (task === grunt.task.current.nameArgs) {
                return;
            }
            logCurrent();
            task = grunt.task.current.nameArgs;
            last = new Date();
        });

        process.on("exit", function () {
            logCurrent();
            if (deferLogs) {
                for (var i = 0; i < deferredMessages.length; i++) {
                    var thisLog = deferredMessages[i];
                    grunt.log.writeln(colour.purple(thisLog));
                }
            }
            logTotal();
            hooker.unhook(grunt.log, "header");
        });
    };

    return timer;
})();