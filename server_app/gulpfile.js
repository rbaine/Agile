//*********** IMPORTS *****************
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var todo = require('gulp-todo');
global.errorMessage = '';
console.log("AGILE NODE APP - GULP");
 
// Lint Task
gulp.task('lint', function() {
    console.log('linting...');
    return gulp.src('app.js, js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// get filenames relative to project root (where your gulpfile is) 
gulp.task('todo', function() {
    gulp.src('app.js').pipe(todo()).pipe(gulp.dest('./'));
    gulp.src('js/*.js').pipe(todo()).pipe(gulp.dest('./'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename('agile_node_app.min.js'))
        .pipe(gulp.dest('out'));

});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'todo']);
    gulp.watch('app.js', ['lint', 'todo']);
});

// Default Task
gulp.task('default', ['lint', 'todo', 'watch']);