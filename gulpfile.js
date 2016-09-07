"use strict";

const gulp = require("gulp"),
      del = require("del"),
      tsc = require("gulp-typescript"),
      sourcemaps = require('gulp-sourcemaps'),
      tslint = require('gulp-tslint'),
      runSequence = require('run-sequence'),
      nodemon = require('gulp-nodemon'),
      browserSync = require('browser-sync').create();

// Delete the distribution
gulp.task('clean:server', (cb) => {
  return del(["dist/server"], cb);
});

gulp.task('clean:client', (cb) => {
  return del(["dist/client"], cb);
});

//Build the server
gulp.task('build:server', ["tslint:server"], function () {
  var tsProject = tsc.createProject('server/tsconfig.json');
  var tsResult = gulp.src('server/src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject))
  return tsResult.js
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('dist/server'))
    .pipe(browserSync.stream());
});

//Build the client
gulp.task('build:client', ["tslint:client"], function(){
  var tsProject = tsc.createProject('client/tsconfig.json');
  var tsResult = gulp.src('client/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject))
  return tsResult.js
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('dist/client'))
    .pipe(browserSync.stream());
});

// Lint all custom TypeScript files.
gulp.task('tslint:server', () => {
  return gulp.src("server/src/**/*.ts")
    .pipe(tslint({ formatter: 'prose' }))
    .pipe(tslint.report());
});

gulp.task('tslint:client', () => {
  return gulp.src("client/app/**/*.ts")
    .pipe(tslint({ formatter: 'prose' }))
    .pipe(tslint.report());
});

//Copy the resources to the distribution
gulp.task("resources:client", () => {
  return gulp.src(["client/**/*", "!client/**/*.ts","!client/typings", "!client/typings/**","!client/*.json"])
    .pipe(gulp.dest("dist/client"))
    .pipe(browserSync.stream());
});

// Copy all required libraries into build directory.
gulp.task("libs", () => {
  return gulp.src([
    'angular2/bundles/angular2-polyfills.js',
    'systemjs/dist/system.src.js',
    'rxjs/bundles/Rx.umd.js',
    'angular2/bundles/angular2.dev.js',
    'angular2/bundles/router.dev.js',
    'angular2/bundles/http.dev.js'
  ], {cwd: "node_modules/**"}) /* Glob required here. */
    .pipe(gulp.dest("dist/client/libs"))
    .pipe(browserSync.stream());
});

// Watch for changes in TypeScript, HTML and CSS files.
gulp.task('watch', function () {
  browserSync.init({
    proxy: "http://localhost:3000",
    port: 7000
  });

  gulp.watch(["server/**/*.ts"], ['build:server']).on('change', function (e) {
      console.log('[Server] TypeScript file ' + e.path + ' has been changed. Compiling.');
  });

  gulp.watch(["client/**/*.ts"], ['build:client']).on('change', function (e) {
      console.log('[Client] TypeScript file ' + e.path + ' has been changed. Compiling.');
  });

  gulp.watch(["client/**/*", "!client/**/*.ts", "!client/typings", "!client/typings/**", "!client/*.json"])
    .on('change', function (file) {
      console.log('[Client] Resource file ' + file.path + ' has been changed. Updating.');
      gulp.src(file.path, {base:"client"}).pipe(gulp.dest("dist/client"));
      browserSync.reload(file);
  });
});

// Start the express server with nodemon
gulp.task('start', function () {
  nodemon({script: 'dist/server/server.js',
    ext: 'js',
    delay: '5000', //ms
    watch: 'dist'})
    .on('restart', function () {
      console.log('Server restarted!')
    })
    .once('quit', function () {
      process.exit();
    });
});

// Build the project.
gulp.task("build", function (callback) {
  runSequence('clean:server', 'clean:client',
    'build:server', 'build:client',
    'resources:client',
    'libs',
    callback);
});

//Build the server only and start it
gulp.task("build-start:server", function (callback) {
  runSequence('clean:server',
    'build:server',
    'start',
    callback);
});

gulp.task("heroku:production", function (callback) {
  runSequence('clean:server', 'clean:client',
    'build:server', 'build:client',
    'resources:client',
    'libs',
    callback);
});