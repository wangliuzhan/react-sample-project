# react-sample-project

React新手入门示例项目

## 工具集 tools

> * React
> * React Router
> * Browserify
> * Gulp
> * Babel
> * npm

## 编辑器 Editor

Atom / WebStorm

## 安装 Install

所有的前端资源都依赖于 `npm`，开发阶段资源直接引用 `node_modules` 中的资源文件

```bash
npm install
```

## 开发 Development

由于使用了ES6，需要在开发阶段实时编译jsx:

```bash
npm run watch
```

## 发布 Build

```bash
npm build
```

发布后会生成assets-build目录，里面包含合并打包的代码
