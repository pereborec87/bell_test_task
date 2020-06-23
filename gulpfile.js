const gulp = require('gulp');
const pump = require('pump');
const flatten = require('gulp-flatten');
const sass = require('gulp-sass');
const clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});

gulp.task('copy-images', function () {
    pump([
        gulp.src('./assets/img/**'),
        gulp.dest('./dist/img'),
    ]);
});

gulp.task('scss', [], (callback) => {
    pump([
        gulp.src('./assets/scss/**/*.scss'),
        flatten(),
        sass().on('error', sass.logError),
        gulp.dest('./dist/css')
    ], callback);
});

gulp.task('scss-dev', [], (callback) => {
    gulp.watch('./assets/scss/**/*.scss', function(event) {
        gulp.run('scss');
    });
});

gulp.task('build', ['clean', 'copy-images', 'scss']);