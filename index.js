/*!
 * base-files-process (https://github.com/node-base/base-files-process)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
var debug = require('debug')('base-files-process');
var utils = require('./utils');

module.exports = function (config) {
  return function (app) {
    if (!utils.isValid(app, 'base-files-process')) return;

    /**
     * Plugins
     */

    this.use(utils.cwd());
    this.use(utils.pipeline());
    this.use(utils.vfs());

    /**
     * Process an array of `files` objects, where each object has a `src` and `dest` property.
     *
     * @param {Array} `files`
     * @param {Object} `options`
     * @return {Object}
     * @api public
     */

    this.define('process', function (files, options) {
      debug('running base-files-process', files);

      var opts = utils.extend({}, config, this.options, files.options, options);
      files.dest = path.resolve(app.cwd, path.resolve(files.dest));

      return this.src(files.src, opts)
        .pipe(this.pipeline(opts.pipeline, opts))
        .on('error', this.emit.bind(this, 'error'))
        .pipe(this.dest(files.dest, opts));
    });
  };
};
