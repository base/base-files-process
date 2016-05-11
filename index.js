/*!
 * base-fs-process (https://github.com/node-base/base-fs-process)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
var debug = require('debug')('base-fs-process');
var extend = require('extend-shallow');
var cwd = require('base-cwd');

module.exports = function(config) {
  return function(app) {
    if (!this.isApp || this.isRegistered('base-fs-process')) return;
    debug('initializing "%s", from "%s"', __filename, module.parent.id);
    app.use(cwd());

    this.define('process', function(files, options) {
      debug('running base-fs-process', files);

      if (typeof this.plugin !== 'function') {
        throw new Error('expected the base-pipeline plugin to be registered');
      }
      if (typeof this.src !== 'function') {
        throw new Error('expected the base-fs plugin to be registered');
      }

      var opts = extend({}, config, this.options, files.options, options);
      files.dest = path.resolve(app.cwd, files.dest);

      return this.src(files.src, opts)
        .pipe(this.pipeline(opts.pipeline, opts))
        .on('error', this.emit.bind(this, 'error'))
        .pipe(this.dest(files.dest, opts));
    });
  };
};
