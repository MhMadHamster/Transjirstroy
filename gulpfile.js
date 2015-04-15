'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concatCSS = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    minify = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    uncss = require('gulp-uncss'),
    prefix = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect'),
    opn = require('opn'),
    wiredep = require('wiredep').stream,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');

function onError(err) {
  console.log(err);
}

// Connect Server
gulp.task('connect', function() {
  connect.server({
    port: 8081,
    root: 'app',
    livereload: true
  });
  opn('http://localhost:8081/');
});

// Clean
gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
          .pipe(clean());
});

// CSS
gulp.task('css', function() {
  gulp.src('app/css/*.css')
    .pipe(concatCSS('styles.css'))
    .pipe(prefix())
    .pipe(minify())
    .pipe(uncss());
});

// SCSS
gulp.task('sass', function() {
  gulp.src('app/scss/styles.scss')
    .pipe(sass())
    .on('error', console.log)
    .pipe(prefix())
    .pipe(gulp.dest('app/css/'))
    .pipe(connect.reload())
    .pipe(notify('SASS Done!'));
})

// Html
gulp.task('html', function() {
  gulp.src('app/*.html')
    .pipe(connect.reload());
});

// JS
gulp.task('js', function() {
  gulp.src('app/js/*.js')
    .pipe(connect.reload());
});

// Bower dependencies
gulp.task('wiredep', function() {
  gulp.src('app/*.html')
    .pipe(wiredep({
      "directory": "app/bower_components/"
    }))
    .pipe(gulp.dest('app/'));
});

// Watch
gulp.task('watch', function() {

  gulp.watch('app/*.html', ['html']);

  gulp.watch(['app/scss/*.scss', 'app/scss/components/*.scss'], ['sass']);

  gulp.watch('app/js/*.js', ['js']);

});

// Font
gulp.task('font', function() {
  gulp.src('app/font/*.*')
    .pipe(gulp.dest('dist/fonts'));
});

// Images
gulp.task('imagemin', function() {
  gulp.src('app/img/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

// DIST
gulp.task('dist', function() {
  var assets = useref.assets();

  return gulp.src('app/index.html')
          .pipe(assets)
          .pipe(gulpif('*.js', uglify()))
          .pipe(gulpif('*.css', minify()))
          .pipe(assets.restore())
          .pipe(useref())
          .pipe(gulp.dest('dist'));
});

// BUILD
gulp.task('build', function() {
  runSequence('clean', 'dist', 'font', 'imagemin');
});

// gulp
gulp.task('default', ['connect', 'watch']);