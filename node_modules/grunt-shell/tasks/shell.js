'use strict';
const exec = require('child_process').exec;
const chalk = require('chalk');
const npmRunPath = require('npm-run-path');

const TEN_MEGABYTES = 1000 * 1000 * 10;

module.exports = grunt => {
	grunt.registerMultiTask('shell', 'Run shell commands', function () {
		const cb = this.async();
		const opts = this.options({
			stdout: true,
			stderr: true,
			stdin: true,
			failOnError: true,
			stdinRawMode: false,
			preferLocal: true,
			execOptions: {
				env: null
			}
		});

		let cmd = typeof this.data === 'string' ? this.data : this.data.command;

		if (cmd === undefined) {
			throw new Error('`command` required');
		}

		// increase max buffer
		opts.execOptions = Object.assign({}, opts.execOptions);
		opts.execOptions.maxBuffer = opts.execOptions.maxBuffer || TEN_MEGABYTES;

		cmd = grunt.template.process(typeof cmd === 'function' ? cmd.apply(grunt, arguments) : cmd);

		if (opts.preferLocal === true) {
			opts.execOptions.env = npmRunPath.env({env: opts.execOptions.env || process.env});
		}

		if (this.data.cwd) {
			opts.execOptions.cwd = this.data.cwd;
		}

		const cp = exec(cmd, opts.execOptions, (err, stdout, stderr) => {
			if (typeof opts.callback === 'function') {
				opts.callback.call(this, err, stdout, stderr, cb);
			} else {
				if (err && opts.failOnError) {
					grunt.warn(err);
				}
				cb();
			}
		});

		const captureOutput = (child, output) => {
			if (grunt.option('color') === false) {
				child.on('data', data => {
					output.write(chalk.stripColor(data));
				});
			} else {
				child.pipe(output);
			}
		};

		grunt.verbose.writeln('Command:', chalk.yellow(cmd));

		if (opts.stdout || grunt.option('verbose')) {
			captureOutput(cp.stdout, process.stdout);
		}

		if (opts.stderr || grunt.option('verbose')) {
			captureOutput(cp.stderr, process.stderr);
		}

		if (opts.stdin) {
			process.stdin.resume();
			process.stdin.setEncoding('utf8');

			if (opts.stdinRawMode && process.stdin.isTTY) {
				process.stdin.setRawMode(true);
			}

			process.stdin.pipe(cp.stdin);
		}
	});
};
