'use strict';

var gulp = require('gulp'),
      del = require('del'),
      csslint = require('gulp-csslint'),
      tsc = require('gulp-typescript'),
      environments = require('gulp-environments'),
      concat = require('gulp-concat'),
      purify = require('gulp-purifycss'),
      sourcemaps = require('gulp-sourcemaps'),
      tslint = require('gulp-tslint'),
      uglify = require('gulp-uglify'),
      runSequence = require('run-sequence'),
      nodemon = require('gulp-nodemon'),
      gulpTypings = require('gulp-typings'),
      builder = require('systemjs-builder'),
      browserSync = require('browser-sync').create();

var development = environments.development;
var production = environments.production;
var ENV = production() ? 'production' : 'development';
console.log('gulpfile.js - ' + ENV);

var tscConfigServer = require('./server/tsconfig.json');
var tscConfigClient = require('./client/tsconfig.json');

//BEGIN - Typings **************************************************************
gulp.task('typings', ['typings:server', 'typings:client']);

gulp.task('typings:server', function (callback) {
  return gulp
    .src('server/typings.json')
    .pipe(gulpTypings());
});

gulp.task('typings:client', function (callback) {
  return gulp
    .src('client/typings.json')
    .pipe(gulpTypings());
});
//END - Typings ****************************************************************

//BEGIN - Clean ****************************************************************
gulp.task('clean', ['clean:server', 'clean:client']);

gulp.task('clean:server', (cb) => {
  return del(['dist/server'], cb);
});

gulp.task('clean:client', (cb) => {
  return del(['dist/client'], cb);
});
//END - Clean ******************************************************************

//BEGIN - Lint *****************************************************************
gulp.task('tslint:server', () => {
  return gulp
    .src('server/src/**/*.ts')
    .pipe(tslint({ formatter: 'prose' }))
    .pipe(tslint.report());
});

gulp.task('tslint:client', () => {
  return gulp
    .src('client/app/**/*.ts')
    .pipe(tslint({ formatter: 'prose' }))
    .pipe(tslint.report());
});

gulp.task('tslint:specs', () => {
  return gulp
    .src(['server/src/**/*.spec.ts', 'client/app/**/*.spec.ts'])
    .pipe(tslint({ formatter: 'prose' }))
    .pipe(tslint.report());
});

gulp.task('tslint:css-composants', () => {
  return gulp
    .src('client/app/components/**/*.css')
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.formatter());
});
//END - Lint *******************************************************************

//BEGIN - Compilation **********************************************************
function compile(tscConfig) {
  return gulp
    .src(tscConfig.filesGlob)
    .pipe(sourcemaps.init())
    .pipe(tsc(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(tscConfig.compilerOptions.outDir))
    .pipe(browserSync.stream());
}

gulp.task('compile', ['compile:server', 'compile:client', 'compile:specs']);

gulp.task('compile:server', ['tslint:server'], function () {
  return compile(tscConfigServer);
});

gulp.task('compile:client', ['tslint:client'], function(){
  return compile(tscConfigClient);
});

gulp.task('compile:specs', ['tslint:specs'], function(){
  var specsClient = JSON.parse(JSON.stringify(tscConfigClient));
  specsClient.filesGlob = ["client/app/**/*.spec.ts", "client/typings/*.d.ts"];

  var specsServe = JSON.parse(JSON.stringify(tscConfigServer));
  specsServe.filesGlob = ["server/src/**/*.spec.ts", "server/typings/*.d.ts"];

  return compile(specsClient) && compile(specsServe);
});
//END - Compilation ************************************************************

//BEGIN - Ressources ***********************************************************
gulp.task('ressources', function(callback) {
  runSequence(
    'ressources:fonts', 'ressources:html',
    'ressources:images', 'ressources:scripts',
    'ressources:css', callback);
});

//  CSS ************************************************************************
gulp.task('ressources:css', ['ressources:css-global', 'ressources:css-composants']);

var optionsPurify = {
  minify: true,
  info: false,
  rejected: false,
  whitelist: [
    '*numeros*'
  ]
};
gulp.task('ressources:css-global', function() {
  return gulp
    .src(['client/css/*.css', '!client/css/font-awesome.css'])
    .pipe(production(
      purify(['dist/client/app/**/*.js',
        'dist/client/scripts/**/*.js',
        'dist/client/**/*.html'], optionsPurify)
     ))
    .pipe(concat('global.min.css'))
    .pipe(gulp.dest('dist/client/css'))
    .pipe(browserSync.stream());
});

gulp.task('ressources:css-composants', ['tslint:css-composants'], function() {
  return gulp
    .src('client/app/components/**/*.css')
    .pipe(production(
      purify(['dist/client/app/**/*.js',
        'dist/client/scripts/**/*.js',
        'dist/client/**/*.html'], optionsPurify)
     ))
    .pipe(gulp.dest('dist/client/app/components'))
    .pipe(browserSync.stream());
});

//  Fonts **********************************************************************
gulp.task('ressources:fonts', function() {
  return gulp
    .src('client/fonts/**/*')
    .pipe(gulp.dest('dist/client/fonts'))
    .pipe(browserSync.stream());
});

//  Html ***********************************************************************
gulp.task('ressources:html', function() {
  return gulp
    .src('client/**/*.html')
    .pipe(gulp.dest('dist/client'))
    .pipe(browserSync.stream());
});

//  Images *********************************************************************
gulp.task('ressources:images', function() {
  return gulp
    .src('client/images/**/*')
    .pipe(gulp.dest('dist/client/images'))
    .pipe(browserSync.stream());
});

//  scripts ********************************************************************
gulp.task('ressources:scripts', [
  'ressources:scripts-min',
  'ressources:scripts-systemjs',
  'ressources:scripts-ie9'
]);

gulp.task('ressources:scripts-systemjs', function() {
  return gulp
    .src([
      'client/scripts/systemjs.config.js'
    ])
    .pipe(gulp.dest('dist/client/scripts'))
    .pipe(browserSync.stream());
});

gulp.task('ressources:scripts-min', function() {
  return gulp
    .src([
      'client/scripts/jquery.js',
      'client/scripts/bootstrap.min.js',
      'client/scripts/bootstrap-year-calendar.js',
      'client/scripts/bootstrap-year-calendar.fr.js',
      'client/scripts/jquery.isotope.min.js',
      'client/scripts/wow.min.js',
      '!client/scripts/systemjs.config.js',
      '!client/scripts/html5shiv.js',
      '!client/scripts/respond.min.js'
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(production(uglify()))
    .pipe(gulp.dest('dist/client/scripts'))
    .pipe(browserSync.stream());
});

gulp.task('ressources:scripts-ie9', function() {
  return gulp
    .src([
      'client/scripts/html5shiv.js',
      'client/scripts/respond.min.js'
    ])
    .pipe(concat('ie9.min.js'))
    .pipe(production(uglify()))
    .pipe(gulp.dest('dist/client/scripts'))
    .pipe(browserSync.stream());
});
//END - Ressources *************************************************************

//BEGIN - Librairies ***********************************************************
gulp.task('libraries', ['libraries:js', 'libraries:map']);

gulp.task('libraries:js', () => {
  return gulp.src([
    'core-js/client/shim.+(js|min.js)',
    'zone.js/dist/zone.js',
    'reflect-metadata/Reflect.js',
    'systemjs/dist/system.src.js',

    '@angular/core/bundles/core.umd.js',
    '@angular/common/bundles/common.umd.js',
    '@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http/bundles/http.umd.js',
    '@angular/router/bundles/router.umd.js',
    '@angular/forms/bundles/forms.umd.js',

    'moment/min/moment-with-locales.min.js',
    'angular2-moment/*.js',

    'angular2-jwt/angular2-jwt.js'
  ], {cwd: 'node_modules/**'})
    .pipe(gulp.dest('dist/client/libs'));
});

gulp.task('libraries:map', () => {
  return gulp
    .src([
      'core-js/client/shim.min.js.map',
      'reflect-metadata/Reflect.js.map',
      'angular2-moment/*.js.map',
      'angular2-moment/src/*.ts',
      'angular2-jwt/angular2-jwt.js.map'
    ], {cwd: 'node_modules/**'})
    .pipe(gulp.dest('dist/client/libs'));
});
//END - Librairies *************************************************************

//BEGIN - Watch ****************************************************************
function watch(fichier) {
  console.log('[Client] Resource file ' + fichier.path + ' has been changed. Updating.');
  gulp.src(fichier.path, {base:'client'}).pipe(gulp.dest('dist/client'));
  browserSync.reload(fichier);
}

gulp.task('watch', function () {
  browserSync.init({
    proxy: 'http://localhost:3000',
    port: 7000
  });

  gulp.watch(['server/**/*.ts'], ['compile:server']).on('change', function (e) {
      console.log('[Server] TypeScript file ' + e.path + ' has been changed. Compiling.');
  });

  gulp.watch(['client/**/*.ts'], ['compile:client']).on('change', function (e) {
      console.log('[Client] TypeScript file ' + e.path + ' has been changed. Compiling.');
  });

  gulp.watch(['client/**/*.css'], ['ressources:css']).on('change', watch);
  gulp.watch(['client/scripts/**/*.js'], ['ressources:scripts']).on('change', watch);
  gulp.watch(['client/images/**/*'], ['ressources:images']).on('change', watch);
  gulp.watch(['client/**/*.html'], ['ressources:html']).on('change', watch);
});
//END - Watch ******************************************************************

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

//Compile the server only and start it
gulp.task('compile-start:server', function (callback) {
  runSequence('clean:server',
    'compile:server',
    'start',
    callback);
});

//Build the server for production
gulp.task('build', function (callback) {
  runSequence('clean', 'typings', 'compile', 'ressources', 'libraries', callback);
});
