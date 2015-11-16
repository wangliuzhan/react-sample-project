'use strict'

var gulp = require('gulp')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var babelify = require('babelify')
var concatCss = require('gulp-concat-css')

var onError = (err) => {
  throw err
}

// process.env.NODE_ENV = 'development'

/**
 * 分块打包
 * https://github.com/sogko/gulp-recipes/blob/master/browserify-separating-app-and-vendor-bundles/gulpfile.js
 */
gulp.task('build-app', () => {
  return browserify('assets/js/index.jsx')
  .transform(babelify, {presets: ["es2015", "react"]})
  .external(['react', 'react-dom', 'react-router'])
  .bundle()
  .on('error', onError)
  .pipe(source('app.js'))
  .pipe(gulp.dest('assets-build/js'))
})

gulp.task('build-common', () => {
  var deps = ['react', 'react-dom', 'react-router']
  var b = browserify()
  deps.forEach((x) => {
    b.require(require.resolve(x), {
      expose: x
    })
  })

  return b.bundle()
  .on('error', onError)
  .pipe(source('common.js'))
  .pipe(gulp.dest('assets-build/js'))
})

gulp.task('build-css', () => {
  return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.css', 'assets/css/*.css'])
    .pipe(concatCss("index.css"))
    .pipe(gulp.dest('assets-build/css'))
})

// 监测jsx变化，实时编译js文件
gulp.task('watch', function() {
  var watcher = gulp.watch('assets/js/**/*.jsx', ['build-app'])
  watcher.on('change', function() {
    console.log('检测到jsx文件内容变化，更新中...')
  })
})

gulp.task('default', ['build-app', 'build-common'])
