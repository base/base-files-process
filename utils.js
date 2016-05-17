'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('base-cwd', 'cwd');
require('base-fs', 'vfs');
require('base-pipeline', 'pipeline');
require('extend-shallow', 'extend');
require('is-registered');
require('is-valid-instance');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
