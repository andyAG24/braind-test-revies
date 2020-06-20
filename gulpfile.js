var config = {
  srcDir: './src/styles',
  sassPattern: '*.scss',
  clean: 'build/css',
  watch: {
    html: './build/index.html',
    sass: './src/styles/main.scss'
  }
}

var gulp = require('gulp'), 
  sass = require('gulp-sass');
const concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  clean = require('gulp-clean'),
  watch = require('gulp-watch'),
  del = require('del');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return gulp.src(config.srcDir + '/' + config.sassPattern)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('main.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.reload({stream: true}))
});
 
gulp.task('watch', function() {
  gulp.watch(['build/index.html', 'src/blocks/**/*.scss'], gulp.series(['clean', 'sass', 'browser-sync']));
});

gulp.task('clean', function(done) {
  del(config.clean);
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