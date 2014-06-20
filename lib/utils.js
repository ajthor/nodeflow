'use strict';

var async = require('async');

var fs = require('fs');

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var inquirer = require('inquirer');

// Utility Functions
// =================
// Extra utility functions for the nodeflow program.

// writeTests Function
// -------------------
// Wait until the user has written unit tests for the new code they 
// plan on writing. Once written, ask them if they are done and 
// continue.
exports.writeTests = function (callback) {
	console.log('Write unit tests to cover the commit.\n');

	var watcher = fs.watch('./test');

	watcher.on('change', function (event, filename) {

		// Make sure you close the watcher BEFORE you go changing a
		// million files in the test folder.
		watcher.close();
		
		// After the tests have been written, call inkblot in 
		// order to move any stray tests to the spec files.
		var gulp = spawn('gulp', ['inkblot'], {
			detached: true,
			cwd: process.cwd(),
			stdio: 'inherit'
		});

		gulp.on('close', function (code) {
			console.log('End inkblot task.');
			callback(null);
		});

	});

	watcher.on('error', function (err) {
		if (err) {
			watcher.close();
			callback(err);
		}
	});
};

// startLoop Function
// ------------------
// The `startLoop` function watches files in the current working 
// directory for changes until all tests in the spec folder have 
// passed. If there are tests which do not pass, meaning the exit 
// code from `mocha` is non-zero, then it will continue.
exports.startLoop = function (callback) {
	console.log('Watching for changes.');
	var hasErr;

	var watcher = fs.watch(process.cwd());

	watcher.on('change', function (event, filename) {
		process.stdout.write('\x1Bc');

		var mocha = spawn('mocha', ['test'], {
			detached: true,
			cwd: process.cwd(),
			stdio: 'inherit'
		});

		mocha.on('close', function (code) {
			hasErr = code ? true : false;

			if (hasErr) {
				console.log('Error');
			}

			else {
				console.log('All tests passed.');
				watcher.close();
				callback(null);
			}
		});
	});

	watcher.on('error', function (err) {
		if (err) {
			watcher.close();
			callback(err);
		}
	});
};


