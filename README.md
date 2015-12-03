# react-sample-project

React新手入门示例项目

## 工具集 tools

> * React
> * React Router
> * React Highcharts
> * Redux
> * Browserify
> * Gulp
> * Babel

## 编辑器 Editor

Atom / WebStorm

## 安装 Install

前端资源依赖于 `npm`，开发阶段资源直接引用 `node_modules` 中的资源文件

```bash
npm install
```

## 开发 Development

由于使用了ES6，需要在开发阶段实时编译jsx:

```bash
npm run watch
```

入口页面 pages/index-dev.html

## 发布 Build

```bash
gulp
```

build改动:

> * 生成assets-build
> * 生成pages/index.html

## 运行 Run

运行一个本地静态服务器查看demo，可能需要先 `npm install -g puer`，然后在项目根目录运行：

```bash
puer .
```

## Mock

查看`assets/js/mocks/index.js`，使用`superagent-mocker`

## 其它

React Highcharts需要先加载highcharts，目前highcharts直接作为全局公共库加载

## 资源推荐

[React入门资源整理](https://github.com/simongfxu/simongfxu.github.com/issues/21)
