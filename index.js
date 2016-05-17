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

module.exports = function(config) {
  return function(app) {
    if (!isValid(this)) return;
    debug('initializing "%s", from "%s"', __filename, module.parent.id);

    this.use(utils.cwd());
    this.use(utils.vfs());
    this.use(utils.pipeline());

    this.define('process', function(files, options) {
      debug('running base-files-process', files);

      var opts = utils.extend({}, config, this.options, files.options, options);
      files.dest = path.resolve(app.cwd, files.dest);

      return this.src(files.src, opts)
        .pipe(this.pipeline(opts.pipeline, opts))
        .on('error', this.emit.bind(this, 'error'))
        .pipe(this.dest(files.dest, opts));
    });
  };
};

function isValid(app) {
  if (!utils.isValidInstance(app, ['app', 'views', 'collection'])) {
    return false;
  }
  if (utils.isRegistered(app, 'base-files-process')) {
    return false;
  }
  return true;
}
