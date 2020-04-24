"use strict";

// Load plugins
const browsersync = require("browser-sync").create();
const del = require("del");
const gulp = require("gulp");
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const merge = require("merge-stream");

// Import Gulp plugins.
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist"
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  build();
  done();
}

function clean() {
  return del(['./dist/']);
}

function fonts() {
  return gulp.src('./fonts/**/*.ttf')
    .pipe(gulp.dest('./dist/fonts/'));
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap Javascript
  var bootstrap = gulp.src('./node_modules/bootstrap/dist/js/**/*')
    .pipe(gulp.dest('./dist/vendor/bootstrap/js'));

  // jQuery
  var jquery = gulp.src([
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js'
  ])
    .pipe(gulp.dest('./dist/vendor/jquery'));

  // Hammer.js
  var hammerjs = gulp.src('./node_modules/hammerjs/hammer.min.js')
    .pipe(gulp.dest('./dist/vendor/hammerjs'));
  return merge(jquery, hammerjs);
}

// Compile SCSS 
function compile_sass() {
  return gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
}

// Transpiile ES6
function es6() {
  return gulp.src('./js/**/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: [
        ['@babel/env', {
          modules: false
        }]
      ]
    }))
    .pipe(gulp.dest('./dist/js/'));
}

// Copy images to dist
function images() {
  return gulp.src('./img/**/*.*')
    .pipe(gulp.dest('./dist/img/'));
}

// Copy index to dist
function html() {
  return gulp.src('./index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/'))
}

// Init browser-sync
function watchFiles() {
  gulp.watch("./scss/*.scss", browserSyncReload);
  gulp.watch("./**/*.html", browserSyncReload);
  gulp.watch("./js/**/*.js", browserSyncReload);
}

const build = gulp.series(clean, modules, es6, compile_sass, images, html, fonts);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Define tasks
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;
