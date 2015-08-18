'use strict';
var util = require('util');
var path = require('path');
var generators = require('yeoman-generator');
var glob = require('glob');
var slugify = require('underscore.string/slugify');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    // add option to skip install
    this.option('skip-install');

    this.slugify = slugify;
  },
  prompting: {
    dir: function () {

      if (this.options.createDirectory !== undefined) {
        return true;
      }

      var done = this.async();
      var prompt = [{
        type: 'confirm',
        name: 'createDirectory',
        message: 'Would you like to create a new directory for your project?'
      }];

      this.prompt(prompt, function (response) {
        this.options.createDirectory = response.createDirectory;
        done();
      }.bind(this));
    },
    dirname: function () {

      if (!this.options.createDirectory || this.options.dirname) {
        return true;
      }

      var done = this.async();
      var prompt = [{
        type: 'input',
        name: 'dirname',
        message: 'Enter the directory name (this will also be used for the app name in package.json)'
      }];

      this.prompt(prompt, function (response) {
        this.options.dirname = response.dirname;
        done();
      }.bind(this));
    }
  },
  writing: {
    buildEnv: function () {

      // create directory
      if(this.options.createDirectory){
        this.destinationRoot(this.options.dirname);
        this.appname = this.options.dirname;
      }

      var name = 'basic';
      this.filetype = 'js';

      // shared across all generators
      this.sourceRoot(path.join(__dirname, 'templates', 'shared'));
      glob.sync('**', { cwd: this.sourceRoot() }).map(function (file) {
        this.template(file, file.replace(/^_/, ''));
      }, this);


      // shared for mvc/basic generators
      this.sourceRoot(path.join(__dirname, 'templates', name + '-shared'));
      this.directory('.', '.');


      // templates
      this.sourceRoot(path.join(__dirname, 'templates', name));
      this.directory('.', '.');
    },
    assetsDirs: function () {
      mkdirp.sync('public');
      mkdirp.sync('public/js');
      mkdirp.sync('public/css');
      mkdirp.sync('public/img');
    }
  },
  install: function () {
    if(!this.options['skip-install']) this.installDependencies();
  }
});
