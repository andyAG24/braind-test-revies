var config = {
  srcDir: './src/styles',
  sassPattern: '*.scss',
  cssDir: 'build/css',
  jsDir: 'build/js',
  watch: {
    html: './build/index.html',
    sass: './src/styles/main.scss'
  }
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
  return gulp.src(config.srcDir + '/' + config.sassPattern)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(concat('main.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.reload({stream: true}))
});
 
gulp.task('watch', function() {
  gulp.watch(
    [
      'build/index.html', 
      'src/blocks/**/*.scss', 
      'src/styles/main.scss',

      'src/js/script.js',
      'src/blocks/**/*.js'
    ], 
    gulp.series(['clean', 'sass', 'js', 'browser-sync']));
});

gulp.task('js', function(done) {
  return gulp.src('./src/blocks/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/js'))
});

gulp.task('clean', function(done) {
  del(config.cssDir, config.jsDir);
  done();
});

gulp.task('browser-sync', function(done) {
  browserSync.init({
    server: {
      baseDir: './build'
    },
    notify: false
  });

  browserSync.watch('./build').on('change', browserSync.reload);

  done();
});