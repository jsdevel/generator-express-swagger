var chai = require('chai');
var gulp  = require('gulp');
var istanbul = require('gulp-istanbul');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var path = require('path');
var resolve = path.resolve;
var server;
var spawn = require('child_process').spawn;
var watch = require('gulp-watch');

var jsFiles = [
  './api/**/*.js',
  './app.js',
  './bin/**/*.js',
  './config/**/*.js',
  './gulpfile.js',
  './handlers/**/*.js',
  './middleware/**/*.js',
  './resources/**/*.js',
  './services/**/*.js',
];

var jsServerFiles = [
  './api/**/*.js',
  './app.js',
  './bin/**/*.js',
  './config/**/*.js',
  './handlers/**/*.js',
  './middleware/**/*.js',
  './resources/**/*.js',
  './services/**/*.js',
];

var serverFiles = [
  './api/**/*',
  './app.js',
  './bin/**/*',
  './config/**/*',
  './handlers/**/*',
  './middleware/**/*',
  './resources/**/*',
  './services/**/*',
];

var testFiles = [
  './test/**/*.js'
];

gulp.task('lint', function() {
  return gulp.src(jsFiles)
      .pipe(jscs({
        preset: 'google'
      }))
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('serve', function() {
  if (server) {
    server.kill();
  }
  server = spawn(resolve(__dirname, 'bin', 'www'));
  server.stdout.pipe(process.stdout);
  server.stderr.pipe(process.stderr);
});

gulp.task('test', function(cb) {
  chai.should();

  gulp.src(jsServerFiles)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      gulp.src(testFiles)
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({
          thresholds: {
            global: 90
          }
        }))
        .on('error', function(err) {
          console.log(err);
          process.exit(1);
        })
        .on('end', cb);
    });
});

gulp.task('watch:lint', ['lint'], function() {
  return gulp.watch(jsFiles, ['lint']);
});

gulp.task('watch:serve', ['serve'], function() {
  return gulp.watch(serverFiles, ['serve']);
});

gulp.task('watch:test', ['test'], function() {
  return gulp.watch(testFiles.concat(serverFiles), ['serve']);
});
