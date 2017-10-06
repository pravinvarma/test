// including plugins
var gulp = require('gulp');
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var color = require('gulp-color');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

var jsFiles = ['app/modules/*.js', 'app/controller/*.js', 'app/filters/*.js', 'app/service/*.js', 'app/constant/*.js', '!app/controller/*.tests.js'];
var bowerjsFiles = ['bower_components/angular/**.js', 'bower_components/angular-material/**.js', 'bower_components/angular-animate/**.js', 'bower_components/angular-sanitize/**.js', 'bower_components/angular-aria/**.js', 'app/script/ui-bootstrap-tpls-1.3.1.js', 'bower_components/jquery/dist/**.js', '!bower_components/**/index.js', '!bower_components/**/*.min.js'];

var cssFiles = ['app/style/style.css', 'app/style/bootstrap.css' ];

// task

gulp.task('build',['minify-css', 'minify-js' ], function () {
 console.log(color('****End of building the project *****','GREEN'));
})


gulp.task('minify-css', function () {
       console.log(color('****Starting to build *****','GREEN'));
    console.log(color('****Starting to minify CSS *****','GREEN'));
 gulp.task('minify-css', () => {
     return gulp.src(cssFiles)
    .pipe(concat('style.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./app/dist'));
});
});

gulp.task('minify-js', ['minify-bower-js'], function () {
    console.log(color('****Starting to minify user defined JS *****','GREEN'));
    gulp.src(jsFiles) // path to your files
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/dist'));
    ignoreFiles: ['.test.js', '-min.js']
});

gulp.task('minify-bower-js', function () {
    console.log(color('****Starting to minify bower JS *****','GREEN'));
    gulp.src(bowerjsFiles) // path to your files
        .pipe(concat('scripts.js'))
        .pipe(rename('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/dist'));
});

gulp.task('jshint', function() {
  return gulp.src(jsFile)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function() {
    console.log(color('****Cleaning the dist folder*****','YELLOW'));
    return del(['dist/*.js']);
});

gulp.task('coverage', ['pre-test'], function() {
    // Here we're piping our `.js` files inside the `lib` folder
    gulp.src(bowerjsFiles, jsFiles)
        // You can change the reporter if you want, try using `nyan`
        .pipe(mocha({reporter: 'spec'}))
        // Here we will create report files using the test's results
        .pipe(istanbul.writeReports());
});

gulp.task('pre-test', function() {
    // This tells gulp which files you want to pipe
    // In our case we want to pipe every `.js` file inside any folders inside `test`
    return gulp.src('app/**/*tests.js')
      .pipe(istanbul())
      // This overwrites `require` so it returns covered files
      .pipe(istanbul.hookRequire());
});