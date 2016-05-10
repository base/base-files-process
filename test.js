'use strict';

require('mocha');
var assert = require('assert');
var process = require('./');

describe('base-fs-process', function() {
  it('should export a function', function() {
    assert.equal(typeof process, 'function');
  });

  it('should export an object', function() {
    assert(process);
    assert.equal(typeof process, 'object');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      process();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected first argument to be a string');
      assert.equal(err.message, 'expected callback to be a function');
      cb();
    }
  });
});
