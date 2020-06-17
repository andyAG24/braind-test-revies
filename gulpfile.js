var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('kek', function () {
    console.log('kek');
})

gulp.task('scss', function() {
  return gulp.src('styles/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('destination'));
});

// gulp.watch('styles/*.scss', ['scss']);
