var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');
var fileinclude = require('gulp-file-include');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var run = require('run-sequence');
var del = require('del');

gulp.task('style', function() {
  return (gulp
      .src('app/scss/style.scss')
      .pipe(
        plumber({
          errorHandler: function(err) {
            console.log(err);
          }
        })
      )
      .pipe(
        sass
          .sync({
            outputStyle: 'expanded'
          })
          .on('error', sass.logError)
      )
      .pipe(
        postcss([
          autoprefixer({
            browsers: ['last 2 version']
          }),
          mqpacker({
            sort: true
          })
        ])
      )
      // .pipe(minify())
      .pipe(gulp.dest('build/'))
      .pipe(browserSync.stream()) );
});

gulp.task('plugins-js', function() {
  gulp
    .src('app/js/plugins/*.js')
    .pipe(concat('plugins.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

gulp.task('modules-js', function() {
  gulp
    .src([
      'app/js/modules/util.js',
      'app/js/modules/searchbar.js',
      'app/js/modules/main-header.js',
      'app/js/modules/out-cover.js',
      'app/js/modules/main-nav.js'
    ])
    .pipe(concat('modules.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

gulp.task('copy-script', function() {
  gulp
    .src(['app/js/*.{js,json}', '!app/js/plugins/**'])
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

gulp.task('fileinclude', function() {
  gulp
    .src('app/*.html')
    .pipe(
      fileinclude({
        indent: true
      })
    )
    .pipe(gulp.dest('build'));
});

gulp.task('copy-images', function() {
  return gulp.src('app/images/**/*').pipe(gulp.dest('build/images'));
});

gulp.task('symbols', function() {
  return gulp
    .src('build/images/svg-symbols/*.svg')
    .pipe(svgmin())
    .pipe(
      svgstore({
        inlineSvg: true
      })
    )
    .pipe(rename('symbols.svg'))
    .pipe(gulp.dest('build/images'));
});

gulp.task('clean', function() {
  return del('build');
});

gulp.task('copy', function() {
  return gulp
    .src(
      [
        'app/fonts/**/*.{woff,woff2}',
        // 'app/images/**',
        //      'app/js/**',
        'app/*.html'
      ],
      {
        base: 'app',
        allowEmpty: true
      }
    )
    .pipe(gulp.dest('build'));
});

gulp.task('build', function(fn) {
  run(
    'clean',
    'copy',
    'style',
    'plugins-js',
    'modules-js',
    'copy-script',
    'fileinclude',
    'copy-images',
    'symbols',
    fn
  );
});

gulp.task('serve', function() {
  browserSync.init({
    server: './build'
  });

  gulp.watch('app/scss/**/*.scss', function() {
    setTimeout(function() {
      gulp.start('style');
    }, 500);
  });
  gulp.watch('app/images/**/*', ['copy-images']);
  gulp.watch('build/images/svg-symbols/*.svg', ['symbols']);
  gulp.watch('app/js/plugins/*.js', ['plugins-js']);
  gulp.watch('app/js/modules/*.js', ['modules-js']);
  gulp.watch('app/js/*.{js,json}', ['copy-script']);
  gulp
    .watch(['app/*.html', 'app/blocks/**/*.html'], ['fileinclude'])
    .on('change', browserSync.reload);
});
