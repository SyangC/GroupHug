var gulp = require('gulp');
var bower = require('main-bower-files');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var runSeq = require('run-sequence');

gulp.task('bower', function() {
  var jsFilter = filter('**/*.js', { restore: true });
  var cssFilter = filter('**/*.css');

  return gulp.src(bower())
    .pipe(jsFilter)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('src/js'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('src/css'));
});

gulp.task('concat', function() {
  gulp.src(['src/**/app.js', 'src/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('src/js'));
});

gulp.task('sass', function() {
  gulp.src('src/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'));
});

gulp.task('default', function() {
  livereload.listen();

  gulp.watch(['src/**/*', 'src/index.html'], function() {
    runSeq(['concat', 'sass'], function() {
      livereload.reload('src/index.html');
    });
  });

  gulp.watch('bower.json', function() {
    runSeq('bower', function() {
      livereload.reload('src/index.html');
    });
  });
});
