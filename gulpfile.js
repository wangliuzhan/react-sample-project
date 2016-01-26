/**
 * 使用方法参见 package.json 的 scripts
 *
 */

/*eslint-disable*/

'use strict'
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

let gulp = require('gulp')
let browserify = require('browserify')
let source = require('vinyl-source-stream')
let babelify = require('babelify')
let concatCss = require('gulp-concat-css')
let minifyCss = require('gulp-minify-css')
let rename = require('gulp-rename')
let uglify = require('gulp-uglify')
let del = require('del')
let replace = require('gulp-html-replace')
let hasher = require('gulp-hasher')
let path = require('path')
let pkg = require('./package.json')
let fs = require('fs')
let deps = Object.keys(pkg.dependencies)
let BABEL_RC = JSON.parse(fs.readFileSync('./.babelrc'))
// 有些公告库脚本不要打包，比如superagent只用到了客户端脚本
let EXCLUED_LIBS = ['superagent']
let onError = function(err) {
  console.log('任务结束，执行出错：')
  console.log(err)
  this.emit('end')
}
let renameFunc = (x) => {
  x.basename += '.min'
}

function getHash(filepath) {
  let hashes = hasher.hashes
  let realpath = path.resolve(__dirname, filepath)
  return '../' + filepath + '?v=' + hashes[realpath]
}

function getLintReport() {
  var CLIEngine = require("eslint").CLIEngine
  var cli = new CLIEngine({
    useEslintrc: true,
    ignore: true,
    extensions: ['jsx', 'js']
  })
  var report = cli.executeOnFiles(["./assets/js/"])
  return report
}

/**
 * 打包业务脚本
 * 分块打包
 * https://github.com/sogko/gulp-recipes/blob/master/browserify-separating-app-and-vendor-bundles/gulpfile.js
 */
gulp.task('build-app', () => {
  return browserify('assets/js/index.jsx')
    .transform(babelify, BABEL_RC)
    .external(deps)
    .bundle()
    .on('error', onError)
    .pipe(source('app.js'))
    .pipe(gulp.dest('assets-build/js'))
})

// 打包公共脚本
gulp.task('build-common', () => {
  let b = browserify()
  deps.forEach((x) => {
    if (EXCLUED_LIBS.indexOf(x) > -1) return

    b.require(require.resolve(x), {
      expose: x
    })
  })

  return b.bundle()
    .on('error', onError)
    .pipe(source('common.js'))
    .pipe(gulp.dest('assets-build/js'))
})

gulp.task('build-charts', () => {
  return gulp.src('assets/js/libs/*.js')
    .pipe(gulp.dest('assets-build/js'))
})

gulp.task('build-css', () => {
  return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.css', 'assets/css/*.css'])
    .pipe(concatCss('index.css'))
    .pipe(gulp.dest('assets-build/css'))
})

gulp.task('build-img', () => {
  return gulp.src('assets/img/*')
    .pipe(gulp.dest('assets-build/img'))
})

gulp.task('build-fonts', () => {
  return gulp.src('assets/fonts/*')
    .pipe(gulp.dest('assets-build/fonts'))
})
gulp.task('clean-css', (cb)=> {
  del(['assets-build/css/*.min.css']).then(() => cb())
})

gulp.task('clean-js', (cb)=> {
  del(['assets-build/js/*.min.js']).then(() => cb())
})

gulp.task('minify-css', ['build-css', 'clean-css'], () => {
  return gulp.src('assets-build/**/*.css')
    .pipe(minifyCss({compatibility: 'ie8', rebase: false}))
    .pipe(rename(renameFunc))
    .pipe(gulp.dest('assets-build'))
})

gulp.task('minify-js', ['build-app', 'build-common', 'build-charts', 'clean-js'], () => {
  return gulp.src('assets-build/**/*.js')
    .pipe(uglify())
    .pipe(rename(renameFunc))
    .pipe(gulp.dest('assets-build'))
})

gulp.task('hasher', ['minify-js', 'minify-css'], () => {
  return gulp.src('assets-build/**/*.min.*')
    .pipe(hasher())
})

/**
 * 发布资源
 * 页面内容替换
 */
gulp.task('publish', ['hasher', 'build-img', 'build-fonts'], () => {
  let opts = {
    css: [
      getHash('assets-build/css/index.min.css')
    ],
    js: [
      getHash('assets-build/js/common.min.js'),
      getHash('assets-build/js/highcharts.min.js'),
      getHash('assets-build/js/app.min.js')
    ]
  }
  return gulp.src('pages/index-dev.*')
    .pipe(replace(opts))
    .pipe(rename((x) => x.basename = x.basename.replace('-dev', '')))
    .pipe(gulp.dest('pages'))
})

// 监测jsx变化，实时编译js文件
gulp.task('watch', ['build-app'], function() {
  let watcher = gulp.watch('assets/js/**/*.jsx', ['build-app'])
  watcher.on('change', function() {
    console.log('检测到jsx文件内容变化，更新中...')
  })

  let watcher2 = gulp.watch('package.json', ['build-common'])
  watcher2.on('change', function() {
    console.log('检测到package.json基础库变化，更新中...')
  })
})

gulp.task('default', function() {
  var report = getLintReport()
  if (report.errorCount > 0) {
    let fileList = report.results.filter((item)=> item.errorCount > 0 || item.warningCount > 0)
      .map((item)=> item.filePath)
    throw new Error(`源码不规范，请检查这些文件：\n${fileList.join('\n')}\n\n`)
  }

  gulp.start('publish')
})
