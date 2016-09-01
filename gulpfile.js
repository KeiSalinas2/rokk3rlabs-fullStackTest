
var nodemon = require('gulp-nodemon'),
		gulp = require('gulp'),
		clean = require('gulp-clean'),
		less = require('gulp-less'),
		autoprefixer = require('gulp-autoprefixer'),
		rename = require('gulp-rename'),
		minifyCss = require('gulp-minify-css'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat');

/* Clean task*/
gulp.task('clean', function() {
  return gulp.src('build/', { read: false })
    .pipe(clean());
});

//Init server
gulp.task('server', function() {
  nodemon({
    script: 'server.js',
    ignore: ['build/**/*']
  });
});

/* Minify CSS */
gulp.task('css', function() {
  return gulp.src('public/assets/css/app.less')
    .pipe(less())
    .pipe(minifyCss())
    .pipe(gulp.dest('build/assets/css'))
});

/* Minify JS*/
gulp.task('appScripts', function() {
  return gulp.src('public/**/*.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('build/js/'))
});

/* Static JSON files */
gulp.task('dataJson', function() {
  return gulp.src('public/**/*.json')
    .pipe(gulp.dest('build/'));
});

/* Minify libs JS*/
gulp.task('scriptsLibs', function() {
  return gulp.src([
      './components/Chart.js/dist/Chart.min.js',
      './components/angular/angular.js',
      './components/angular-ui-router/release/angular-ui-router.min.js',
      './components/lodash/dist/lodash.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('build/js/'));
});

/* Minify libs CSS */
gulp.task('libsStyle', function() {
  return gulp.src([
      './components/font-awesome/css/font-awesome.css'
    ])
    .pipe(concat('libs.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('build/assets/css/'));
});

/* Build fonts */
gulp.task('fonts', function() {
  return gulp.src([
      './components/font-awesome/fonts/*'
    ])
    .pipe(gulp.dest('build/assets/fonts'));
});

/* Build Templates */
gulp.task('templates', function() {
  return gulp.src('public/modules/**/*.html')
    .pipe(gulp.dest('build/templates/'))
});

/* Build images */
gulp.task('images', function() {
  return gulp.src('public/assets/img/*')
    .pipe(gulp.dest('build/assets/img/'));
});

/* Build index */
gulp.task('index', function() {
  return gulp.src('public/*.html')
    .pipe(gulp.dest('build/'))
});

/* Watch files */
gulp.task('watch', function() {
  gulp.watch(['public/**/*'], ['build']);
});

/* Build task */
gulp.task('build', ['images', 'appScripts','scriptsLibs','dataJson','css','templates','index', 'libsStyle', 'fonts']);

/* Defaul task - run app */
gulp.task('default', ['clean'], function() {
  gulp.start('build');
  gulp.start('server');
  gulp.start('watch');
});