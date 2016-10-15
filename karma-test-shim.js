debugger;
if (!Object.hasOwnProperty('name')) {
  Object.defineProperty(Function.prototype, 'name', {
    get: function() {
      var matches = this.toString().match(/^\s*function\s*(\S*)\s*\(/);
      var name = matches && matches.length > 1 ? matches[1] : "";
      Object.defineProperty(this, 'name', {value: name});
      return name;
    }
  });
}

// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = function() {};

// Load our SystemJS configuration.
System.config({
  baseURL: '/base/'
});

System.config({
  defaultJSExtensions: true,
  paths: {
    'npm:': 'node_modules/'
  },
  map: {
    // angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

    // angular testing umd bundles
    '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
    '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
    '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
    '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
    '@angular/router/testing': 'npm:@angular/router/bundles/router-testing.umd.js',
    '@angular/forms/testing': 'npm:@angular/forms/bundles/forms-testing.umd.js',

    // other libraries
    'rxjs': 'npm:rxjs',
    'moment': 'npm:moment',
    'angular2-moment': 'npm:angular2-moment'
  },
  packages: {
    rxjs: { defaultExtension: 'js' },
    'moment': {
      main: 'min/moment-with-locales.min.js'
    },
    'angular2-moment': {
      main: 'index'
    },

    'dist/server/app/business': { main: 'index' },
    'dist/server/app/model': { main: 'index' },
    'dist/server/app/services': { main: 'index' },
    'dist/server/config/routes': { main: 'index' },
    'dist/server/utils': { main: 'index' },
    'dist/server/controllers': { main: 'index' },
    'dist/server/robots': { main: 'index' }
  }
});

Promise.all([
  System.import('@angular/core/testing'),
  System.import('@angular/platform-browser-dynamic/testing')
]).then(function (providers) {
  var coreTesting = providers[0];
  var browserTesting = providers[1];
  coreTesting.TestBed.initTestEnvironment(
          browserTesting.BrowserDynamicTestingModule,
          browserTesting.platformBrowserDynamicTesting());

}).then(function() {
  return Promise.all(
    Object.keys(window.__karma__.files) // All files served by Karma.
    .filter(onlySpecFiles)
    .map(file2moduleName)
    .map(importModules)
  );
})
.then(function() {
  __karma__.start();
}, function(error) {
  console.error(error.name + ": " + error.message);
});

// Filter spec files
function onlySpecFiles(path) {
  var patternMatched = __karma__.config.files ? path.match(new RegExp(__karma__.config.files)) : true;
  return patternMatched && /[\.|_]spec\.js$/.test(path);
}

// Normalize paths to module names.
function file2moduleName(filePath) {
  return filePath.replace(/\\/g, '/')
    .replace(/^\/base\//, '')
    .replace(/\.js$/, '');
}

// Import module path
function importModules(path) {
    return System.import(path);
}