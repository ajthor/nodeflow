/* global describe, it, beforeEach, afterEach, before, after */
/* global expect, should, assert, require */

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    assert = chai.assert,
    should = chai.should();

describe('exported object', function() {

    var exported = require('../lib/nodeflow.js');

    it('should not be undefined', function() {
        expect(exported).to.not.be.undefined;
    });

    describe('nodeflowJs object', function() {

        var nodeflowJs = exported;

        it('should exist', function() {
            expect(nodeflowJs).to.exist;
        });

        describe('log function', function() {

            var log = nodeflowJs.log;

            it('should exist', function() {
                expect(log).to.exist;
            });

        });

        describe('start function', function() {

            var start = nodeflowJs.start;

            it('should exist', function() {
                expect(start).to.exist;
            });

        });

        describe('writeTests function', function() {

            var writeTests = nodeflowJs.writeTests;

            it('should exist', function() {
                expect(writeTests).to.exist;
            });

        });

        describe('startLoop function', function() {

            var startLoop = nodeflowJs.startLoop;

            it('should exist', function() {
                expect(startLoop).to.exist;
            });

        });

    });
});