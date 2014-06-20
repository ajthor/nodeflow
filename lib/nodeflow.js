'use strict';

var _ = require('underscore');
var async = require('async');

var chalk = require('chalk');

var utils = require('./utils.js');

// GitFlow Node.js Flow Tool
// =========================
// The Node.js Flow tool is made to be used as a workflow helper 
// which acts as a guide for scatterbrained developers like me who 
// can't manage to keep a consistent workflow. It initiates an 
// infinite development loop which consolidates the development cycle 
// into a discrete set of concrete steps.

// 1. Define an objective.
// 2. Write unit tests.
// 3. Start a testing loop.
// 4. Write code until loop passes.
// 5. Close the testing loop and make a commit.

var nodeflow = module.exports = {

	log: function () {
		var start, end;
		var ibLog = '[' + chalk.grey('nodeflow') + ']';
		var args = Array.prototype.slice.call(arguments);
		args.unshift(ibLog);

		var i, match;
		for (i = args.length; i--; ) {
			if ((match = /\'(.+?)\'/.exec(args[i])) !== null) {
				args[i] = '[ ' + chalk.cyan(match[1]) + ' ]';
			}
		}

		console.log.apply(console, args);
	},

	start: function () {
		// Herein lies the `forever` loop. Beware.
		async.forever(
			function (callback) {
				console.log('\nStarting a new development loop.');
				async.series([

					// Write unit tests.
					utils.writeTests.bind(this),

					// Start a testing loop.
					utils.startLoop.bind(this)

				],
				function (err, results) {
					if (err) {
						callback(err);
					}
					else {
						callback(null);
					}
				});
			},
			// Once the loop has ended, we will make a commit in Git 
			// using the objective specified earlier.
			function (err) {
				if (err) {
					throw err;
				}
				console.log('Done.');
				process.exit(0);
			}
		);
	}

};

_.extend(nodeflow, utils);


