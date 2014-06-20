#!/usr/bin/env node

'use strict';

var fs = require('fs');
var util = require('util');
var path = require('path');

var nodeflow = require('../lib/nodeflow.js');

// CLI
// ---
// The command-line functionality is defined here.

var usageMsg = 'usage:  flow [<command>] [options]';

var usage = function () {
	console.log(usageMsg);
}

// Make sure the process calling this script is not a child process.
// Testing frameworks, eg, will call this process when they require 
// this module. To avoid starting a child process, we check here to 
// see who has called this script.
var ext;
var base;
ext = path.extname(process.argv[1]);
base = path.basename(process.argv[1], ext);

if (base === 'flow') {

	nodeflow.start();

}


