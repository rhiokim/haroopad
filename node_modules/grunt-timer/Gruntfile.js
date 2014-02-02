var timer = require("./grunt-timer.js");
module.exports = function (grunt) {
    timer.init(grunt, {deferLogs: true, friendlyTime: true});
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            all: ["*.js"]
        },
        watch: {
            files: ["*.js"],
            tasks: ["jshint"]
        }
    });
    grunt.task.registerTask("run", "runs a task that lasts the designated number of ms", function (ms) {
        var done = this.async();
        setTimeout(function() {
            grunt.log.writeln( ms + "ms task ran");
            done();
        }, parseInt(ms, 10));
    });
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.registerTask("test", ["run:100", "run:500", "run:1000"]);
};