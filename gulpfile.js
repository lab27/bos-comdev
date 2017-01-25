const child = require('child_process');
const browserSync = require('browser-sync').create();

const gulp = require('gulp');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
const siteRoot = '_site';
const cssFiles = '_css/**/*.?(s)css';

gulp.task('svgstore', function () {
    return gulp
        .src('_includes/svg/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('_includes'));
});




gulp.task('css', () => {
  gulp.src(cssFiles)
    .pipe(sass({includePaths: ['./_sass']}))
    //.pipe(sass())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('clean', function () {
    return gulp.src('_site', {read: false})
        .pipe(clean());
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });

  gulp.watch(cssFiles, ['css']);
});

gulp.task('default', ['svgstore','clean','css', 'jekyll', 'serve']);
