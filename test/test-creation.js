/*global describe, beforeEach, it*/
'use strict';

var assert  = require('yeoman-generator').assert;
var path    = require('path');
var helpers = require('yeoman-generator').test;
var rimraf  = require('rimraf');

var basicExpected = [
  '.editorconfig',
  '.gitignore',
  'app.js',
  'public/css',
  'public/img',
  'public/js',
  'package.json',
  'routes/index.js',
  'bin/www'
];

var appFiles = {
  basic: basicExpected,
};

var runGenerationTest = function (extraFiles, projectType, dir, dirname, callback) {
  // Set up initial file list Basic
  var expectedFiles = extraFiles.concat(appFiles[projectType]);

  // Never install dependencies
  this.app.options['skip-install'] = true;

  // Set generator options
  this.app.options[projectType] = true;
  this.app.options.createDirectory = dir || false;
  this.app.options.dirname = dirname;

  // Test files generation
  this.app.run(function () {
    assert.file(expectedFiles);
    callback();
  });
};

describe('Express generator', function () {

  after(function (done) {
    rimraf(__dirname + '/temp', done);
  });

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('express:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  describe('Basic generator', function () {
    var extraFiles = [];

    it('creates expected files', function (done) {
      runGenerationTest.call(this, extraFiles, 'basic', false, 'none', done);
    });
  });
});
