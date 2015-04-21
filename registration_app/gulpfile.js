//*********** IMPORTS *****************
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var todo = require('gulp-todo');
global.errorMessage = '';
 
console.log("- - - - -     REGISTRATION APP - GULP    - - - - -");

// Lint Task
gulp.task('lint', function() {
    console.log('linting...');
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Copy files to node server directory
gulp.task('copy', function(){
  console.log('copying to prod/dev...');
  gulp.src('js/*').pipe(gulp.dest('../server_app/html/js'));
  gulp.src('*.html').pipe(gulp.dest('../server_app/html'));
  gulp.src('views/*').pipe(gulp.dest('../server_app/html/views'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'copy']);
    gulp.watch('*.html', ['copy']);
    gulp.watch('views/*', ['copy']);
});

// Default Task
gulp.task('default', ['lint', 'copy', 'watch']);