//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './',

    files: [
      'bower_components/angular/angular.js',
            
      'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/angular-animate/angular-animate.js',
         'bower_components/angular-sanitize/angular-sanitize.js',
         'bower_components/angular-material/angular-material.js',
         'bower_components/angular-aria/angular-aria.js',
         
        'app/modules/*.js',
         'app/constant/constants.js',
        'app/script/ui-bootstrap*.js',
        'app/service/*.js',
        'app/controller/*.js',
        'app/**/*.tests.js',
    ],

    singleRun: false,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};