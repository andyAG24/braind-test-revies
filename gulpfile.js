var config = {
  srcDir: './src',
  srcCssDir: './src/styles',
  srcImgDir: './src/img',
  srcIconDir: './src/img/icon',
  srcJsDir: './src/js',

  buildDir: './build',
  buildImgDir: './build/img',
  buildIconDir: './build/img/icon',
  buildCssDir: './build/css',
  buildJsDir: './build/js',

  sassPattern: '*.scss',
};

var gulp = require('gulp'),
  sass = require('gulp-sass');
const concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  clean = require('gulp-clean'),
  watch = require('gulp-watch'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return gulp.src(config.srcCssDir + '/' + config.sassPattern)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(concat('main.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(config.buildCssDir))
  .pipe(browserSync.reload({stream: true}))
});
 
gulp.task('watch', function() {
  gulp.watch(
    [
      config.srcDir + '/index.html', 
      config.srcDir + '/blocks/**/*.scss', 
      config.srcCssDir + '/main.scss',

      config.srcJsDir + '/script.js',
      config.srcDir + '/blocks/**/*.js'
    ], 
    gulp.series(['build', 'browser-sync']));
});

gulp.task('js', function(done) {
  return gulp.src(config.srcDir + '/blocks/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.buildJsDir))
});

gulp.task('clean', function(done) {
  del('build/**');
  done();
});

gulp.task('browser-sync', function(done) {
  browserSync.init({
    server: {
      baseDir: config.buildDir
    },
    notify: false
  });
  browserSync.watch(config.buildDir).on('change', browserSync.reload);
  done();
});

gulp.task('copy', (done) => {
  gulp.src(config.srcImgDir + '/*.{jpg,jpeg,gif,svg,png}')
    .pipe(gulp.dest(config.buildImgDir));
  gulp.src(config.srcIconDir + '/*.{jpg,jpeg,gif,svg,png}')
    .pipe(gulp.dest(config.buildIconDir));
  gulp.src(config.srcDir + '/*.html')
    .pipe(gulp.dest(config.buildDir));
  done();
});

gulp.task('build', gulp.series(gulp.parallel('sass', 'js', 'copy')));