const gulp = require('gulp');
const pump = require('pump');
const flatten = require('gulp-flatten');
const sass = require('gulp-sass');

gulp.task('scss', [], (callback) => {
    pump([
        gulp.src('./assets/scss/**/*.scss'),
        flatten(),
        sass().on('error', sass.logError),
        gulp.dest('./dist')
    ], callback);
});

gulp.task('scss-dev', [], (callback) => {
    gulp.watch('./assets/scss/**/*.scss', function(event) {
        gulp.run('scss');
    });
});

gulp.task('build', ['scss']);