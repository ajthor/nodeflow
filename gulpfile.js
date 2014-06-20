var gulp = require('gulp');
var gutil = require('gulp-util');

var shell = require('gulp-shell');

var jshint = require('gulp-jshint');
var inkblot = require('gulp-inkblot');
var mocha = require('gulp-mocha');

var scriptFiles = [
	'./bin/**/*.js',
	'!./bin/flow.js',
	'./src/**/*.js',
	'./lib/**/*.js'
];
// Testing Task
// ============
// The testing task runs lint, inkblot, and mocha.
gulp.task('lint', function () {
	return gulp.src(scriptFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('inkblot', function () {
	return gulp.src(scriptFiles)
		.pipe(inkblot())
		.on('error', gutil.log);
});

gulp.task('test', function () {
	return gulp.src(['./test/**/*.spec.js'])
		.pipe(mocha())
		.on('error', gutil.log);
});

gulp.task('watch', function () {
	gulp.watch(scriptFiles, ['lint', 'inkblot', 'test']);
	gulp.watch(['./test/**/*.spec.js'], ['test']);
});

gulp.task('default', ['lint', 'inkblot', 'test', 'watch']);

