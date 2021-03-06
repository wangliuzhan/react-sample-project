'use strict'

var gulp = require('gulp')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var babelify = require('babelify')
var concatCss = require('gulp-concat-css')
var minifyCss = require('gulp-minify-css')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var del = require('del')
var replace = require('gulp-html-replace')
var hasher = require('gulp-hasher')
var path = require('path')
var pkg = require('./package.json')
var deps = Object.keys(pkg.dependencies)

process.env.NODE_ENV = 'development'

var onError = (err) => {
  throw err
}
var renameFunc = (x) => {
  x.basename += '.min'
}

function getHash(filepath) {
  var hashes = hasher.hashes
  var realpath = path.resolve(__dirname, filepath)
  return '../' + filepath + '?v=' + hashes[realpath]
}

/**
 * 分块打包
 * https://github.com/sogko/gulp-recipes/blob/master/browserify-separating-app-and-vendor-bundles/gulpfile.js
 */
gulp.task('build-app', () => {
  return browserify('assets/js/index.jsx')
  .transform(babelify, {presets: ["es2015", "react"]})
  .external(deps)
  .bundle()
  .on('error', onError)
  .pipe(source('app.js'))
  .pipe(gulp.dest('assets-build/js'))
})

gulp.task('build-common', () => {
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

gulp.task('clean-css', (cb)=> {
  del(['assets-build/css/*.min.css']).then(() => cb())
})

gulp.task('clean-js', (cb)=> {
  del(['assets-build/js/*.min.js']).then(() => cb())
})

gulp.task('minify-css', ['build-css', 'clean-css'], () => {
  return gulp.src('assets-build/**/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename(renameFunc))
    .pipe(gulp.dest('assets-build'))
})

gulp.task('minify-js', ['build-app', 'build-common', 'clean-js'], () => {
  return gulp.src('assets-build/**/*.js')
    .pipe(uglify())
    .pipe(rename(renameFunc))
    .pipe(gulp.dest('assets-build'))
})

gulp.task('hasher', ['minify-js', 'minify-css'], () => {
  return gulp.src('assets-build/**/*.min.*')
    .pipe(hasher())
})

gulp.task('publish', ['hasher'], () => {
  var opts = {
    css: [
      getHash('assets-build/css/index.min.css')
    ],
    js: [
      getHash('assets-build/js/common.min.js'),
      getHash('assets-build/js/app.min.js')
    ]
  }
  return gulp.src('pages/index-dev.html')
    .pipe(replace(opts))
    .pipe(rename((x) => x.basename = x.basename.replace('-dev', '')))
    .pipe(gulp.dest('pages'))
})

// 监测jsx变化，实时编译js文件
gulp.task('watch', ['build-app'], function() {
  var watcher = gulp.watch('assets/js/**/*.jsx', ['build-app'])
  watcher.on('change', function() {
    console.log('检测到jsx文件内容变化，更新中...')
  })
})

gulp.task('default', ['publish'])
