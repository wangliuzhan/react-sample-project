/**
 * redux utils
 * 基于一些约定与规则
 */

import ACTION_REDUCER_MAP from '../reducers/index.jsx'
import {connect} from 'react-redux'
import _ from 'lodash'
import * as utils from '../utils/utils.jsx'

// 验证action.type, 只能为英文字符和下划线
function isValidActionType(type = '') {
  return _.isString(type) && type.match(/^[a-z_]+$/g)
}

// 验证模块名，只能为小写字母
function isValidReducerModuleName(moduleName = '') {
  return _.isString(moduleName) && moduleName.match(/^[a-z]+$/g)
}

// 验证reducer函数名，camelCase
function isValidReducerFunctionName(funcName = '') {
  return _.isString(funcName) && funcName.match(/^[a-z]+$/gi)
}

// 验证配置
function isValidActionReducerMap(map = {}) {
  for (let moduleName in map) {
    if (!isValidReducerModuleName(moduleName)) {
      console.warn(`模块名${moduleName}不符合规范`)
      return false
    }

    for (let funcName in map[moduleName]) {
      if (!isValidReducerFunctionName(funcName)) {
        console.warn(`模块${moduleName}中的reducer函数名${funcName}不符合规范`)
        return false
      }
    }
  }

  return true
}

/**
 * 自动生成全部的actions函数
 * 所有的action函数返回值仅包含两个字段：type和data
 * type字段格式为snakeCase（模块名称、模块方法名组成）
 * data为任何类型均可
 */
function buildAction(moduleName, reducerName) {
  return function(data) {
    return {
      type: _.snakeCase(moduleName + '_' + reducerName),
      data
    }
  }
}

function getActionHandler(actionType = '') {
  let handler = null
  if (actionType === '@@redux/INIT') return handler

  if (!isValidActionType(actionType)) {
    console.warn(`action.type只能包含小写英文字母和下划线:${actionType}`)
    return handler
  }

  let meta = actionType.split('_')
  if (meta.length < 2) {
    console.warn(`${actionType}不符合约定规则。参考格式：模块名_函数名`)
    return handler
  }

  let moduleName = meta.shift()
  let mod = ACTION_REDUCER_MAP[moduleName]
  if (!mod) {
    console.warn(`${moduleName}对应的reducer模块不存在，请检查ACTION_REDUCER_MAP和${actionType}设置是否正确`)
    return handler
  }

  let funcName = _.camelCase(meta.join('_'))
  handler = mod[funcName]
  if (!_.isFunction(handler)) {
    console.warn(`${moduleName}对应的reducer函数${funcName}不存在`)
    return handler
  }

  return handler
}

/**
 * 将多个reducer合并成一个reducer
 * 单独的reducer不用判断action.type，只需要处理业务逻辑即可
 * actions根据映射表自动生成，对应的reducer也是根据映射表匹配
 */
export function combinedReducer(state, action) {
  let handler = getActionHandler(action.type)
  return handler ? handler(state, action) : state
}

export function mapStateToProps(state = {}) {
  return {
    states: Object.assign({}, state)
  }
}

export function mapDispatchToProps(dispatch) {
  let actions = {}
  Object.keys(ACTION_REDUCER_MAP).forEach((moduleName) => {
    let mod = utils.getExposedModule(ACTION_REDUCER_MAP[moduleName])
    Object.keys(mod).forEach((reducerName) => {
      let reducer = utils.getExposedModule(mod[reducerName])
      if (!_.isFunction(reducer)) return

      let realActionName = _.camelCase(['on', moduleName, reducerName].join('_'))
      actions[realActionName] = (data) => {
        dispatch(buildAction(moduleName, reducerName)(data))
      }
    })
  })

  return {actions}
}

/**
 * 入口组件调用传递actions和states
 */
export function connectComponent(component) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)
}

// 开始验证配置
if (!isValidActionReducerMap(ACTION_REDUCER_MAP)) {
  throw new Error('ACTION_REDUCER_MAP配置错误')
}
