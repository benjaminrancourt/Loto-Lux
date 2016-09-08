(function (global) {
  System.config({
    paths: {
      'npm:': 'libs/'
    },
    map: {
      'app': 'app',

      'components': './app/components',
      'models': './app/models',
      'services': './app/services',

      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      'rxjs': 'https://unpkg.com/rxjs@5.0.0-beta.6',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
      'moment': 'npm:moment',
      'angular2-moment': 'npm:angular2-moment'
    },

    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },

      components: { main: 'index' },
      models: { main: 'index' },
      services: { main: 'index' },

      rxjs: {
        main: './libs/rxjs/bundles/Rx.umd.js',
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'moment': {
        main: './min/moment-with-locales.min.js',
        defaultExtension: 'js'
      },
      'angular2-moment': {
        main: './index.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);