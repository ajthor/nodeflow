/* global describe, it, beforeEach, afterEach, before, after */
/* global expect, should, assert, require */

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    assert = chai.assert,
    should = chai.should();

describe('exported object', function() {

    var exported = require('../lib/utils.js');

    it('should not be undefined', function() {
        expect(exported).to.not.be.undefined;
    });

    describe('utilsJs object', function() {

        var utilsJs = exported;

        it('should exist', function() {
            expect(utilsJs).to.exist;
        });

        describe('writeTests function', function() {

            var writeTests = utilsJs.writeTests;

            it('should exist', function() {
                expect(writeTests).to.exist;
            });

        });

        describe('startLoop function', function() {

            var startLoop = utilsJs.startLoop;

            it('should exist', function() {
                expect(startLoop).to.exist;
            });

        });


    });
});