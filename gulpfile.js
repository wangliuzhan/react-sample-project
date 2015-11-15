'use strict'

var gulp = require('gulp')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var babelify = require("babelify")

/**
 * 分块打包
 * https://github.com/sogko/gulp-recipes/blob/master/browserify-separating-app-and-vendor-bundles/gulpfile.js
 */
gulp.task('build-app', () => {
  browserify('assets/js/app.jsx', {
    debug: true
  }).transform(babelify, {presets: ["es2015", "react"]})
  .external(['react', 'react-dom', 'react-router'])
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('assets-build/js'))
})

gulp.task('build-vendor', () => {
  var deps = ['react', 'react-dom', 'react-router']
  var b = browserify()
  deps.forEach((x) => {
    b.require(require.resolve(x), {
      expose: x
    })
  })
  b.bundle()
  .pipe(source('common.js'))
  .pipe(gulp.dest('assets-build/js'))
})

gulp.task('default', () => {

})
