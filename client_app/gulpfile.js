//*********** IMPORTS *****************
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var todo = require('gulp-todo');
global.errorMessage = '';
 
// Lint Task
gulp.task('lint', function() {
    console.log('linting...');
    return gulp.src(['js/*.js', '!js/angular-local-storage.js', '!js/sidebar.js', '!js/sortable.js', '!js/toastr.js', '!js/ui-bootstrap*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// get filenames relative to project root (where your gulpfile is) 
gulp.task('todo', function() {
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

// Copy files to node server directory
gulp.task('copy', function(){
  console.log('copying to prod/dev...');
  gulp.src('*.html').pipe(gulp.dest('../server_app/html'));
  gulp.src('css/*').pipe(gulp.dest('../server_app/html/css'));
  gulp.src('img/*, !img/Thumbs.db').pipe(gulp.dest('../server_app/html/img'));
  gulp.src('js/*').pipe(gulp.dest('../server_app/html/js'));
  gulp.src('views/*').pipe(gulp.dest('../server_app/html/views'));
});




// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'todo', 'copy']);
    gulp.watch('*.html', ['copy']);
    gulp.watch('css/*', ['copy']);
    gulp.watch('img/*', ['copy']);
    gulp.watch('views/*', ['copy']);
});

// Default Task
gulp.task('default', ['lint', 'todo', 'copy', 'watch']);