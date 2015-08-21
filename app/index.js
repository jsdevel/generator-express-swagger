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
  prompting: function() {
    var done = this.async();

    this.prompt([
      {
        type: 'confirm',
        name: 'createDirectory',
        message: 'Would you like to create a new directory for your project?'
      },
      {
        type: 'input',
        name: 'appname',
        message: 'Enter app/directory name'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter the project description.  This will be used in README.md, package.json, and the swagger documentation'
      },
      {
        type: 'input',
        name: 'license',
        message: 'Enter the project license.  This will be used in README.md, package.json, and the swagger documentation',
        default: 'UNLICENSED'
      },
      {
        type: 'input',
        name: 'apiBasePath',
        message: 'Enter base path for the API I.E. /api/v1',
        default: '/api/v1'
      }
    ], function (response) {
      this.options.createDirectory = response.createDirectory;
      this.options.appname = response.appname;
      this.options.description = response.description;
      this.options.license = response.license;
      this.options.apiBasePath = response.apiBasePath;

      done();
    }.bind(this));
  }

  writing: {
    buildEnv: function () {
      if(this.options.createDirectory){
        this.destinationRoot(this.options.appname);
      }

      this.sourceRoot(path.join(__dirname, 'templates', 'base'));
      this.directory('.', '.');

      this.sourceRoot(path.join(__dirname, 'templates', 'specific'));
      glob.sync('**/*', { cwd: this.sourceRoot() }).map(function (file) {
        this.template(file, file);
      }, this);
    }
  },
  install: function () {
    if(!this.options['skip-install']) this.installDependencies();
  }
});
