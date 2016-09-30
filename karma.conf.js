module.exports = function(config) {
  config.set({
    basePath: './',

    frameworks: ['jasmine'],

    plugins: [
      'karma-remap-istanbul',
      'karma-jasmine',
      'karma-mocha-reporter',
      'karma-coverage',
      'karma-chrome-launcher'
    ],

    browsers: process.env.TRAVIS ? ['Chrome_travis_ci'] : ['Chrome'],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    files: [
      // System.js for module loading
      'node_modules/systemjs/dist/system.src.js',

      // Polyfills
      'node_modules/core-js/client/shim.js',

      // Reflect and Zone.js
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      // RxJs
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: true },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: true },

      // paths loaded via module imports
      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: true },
      { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: true },
      { pattern: 'node_modules/moment/min/moment-with-locales.min.js', included: false, watched: true },

      'karma-test-shim.js',
      { pattern: 'dist/**/*.js', included: false, watched: true },

      // paths loaded via Angular's component compiler
      { pattern: 'dist/**/*.html', included: false, watched: true },
      { pattern: 'dist/**/*.css', included: false, watched: true },

      // paths to support debugging with source maps in dev tools
      { pattern: 'client/**/*.ts', included: false, watched: false },
      { pattern: 'server/**/*.ts', included: false, watched: false },
      { pattern: 'dist/**/*.js.map', included: false, watched: false }
    ],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    preprocessors: {
      'dist/**/!(*spec).js': ['coverage']
    },

    reporters: ['mocha', 'coverage', 'karma-remap-istanbul'],

    coverageReporter: {
      reporters:[
        {type: 'json', dir: './coverage', subdir: '.', file: 'coverage.json'}
      ]
    },

    remapIstanbulReporter: {
      reports: {
        lcovonly: 'coverage/lcov.info',
        html: 'coverage'
      }
    },

    singleRun: true
  });
};
