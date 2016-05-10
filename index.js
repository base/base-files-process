/*!
 * base-fs-process (https://github.com/node-base/base-fs-process)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var debug = require('debug')('base-fs-process');

module.exports = function(config) {
  return function(app) {
    if (this.isRegistered('base-fs-process')) return;
    debug('initializing "%s", from "%s"', __filename, module.parent.id);

    this.define('process', function() {
      debug('running process');
      
    });
  };
};
