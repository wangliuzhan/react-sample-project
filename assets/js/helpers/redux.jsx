// TODO redux utils

import {ACTION_REDUCER_MAP} from '../config.jsx'
import {connect} from 'react-redux'
import _ from 'lodash'
import * as utils from '../utils/utils.jsx'

/**
 * 将多个reducer合并成一个reducer
 * 单独的reducer不用判断action.type，只需要处理业务逻辑即可
 * actions根据映射表自动生成，对应的reducer也是根据映射表匹配
 */
export function combinedReducer(state, action) {
  let meta = action.type.split('_')
  let fileName = meta.shift()
  let mod = ACTION_REDUCER_MAP[fileName]
  let funcName = _.camelCase(meta.join('_'))
  let handler = mod && mod[funcName]
  if (!mod || typeof handler !== 'function') {
    console.warn(`${action.type}找不到匹配的reducer`)
  }

  // NOTE action.type = '@@redux/INIT'
  return handler ? handler(state, action) : state
}

/**
 * 自动生成全部的actions函数
 * NOTE 约定
 * 所有的action函数返回值仅包含两个字段：type和data
 * type字段格式为snakeCase（模块名称、模块方法名组成）
 * data为任何类型均可
 */
export function buildAction(moduleName, reducerName) {
  return function(data) {
    return {
      type: _.snakeCase(moduleName + '_' + reducerName),
      data
    }
  }
}


/**
 * 状态数据都存储在states属性
 */
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

export function connectComponent(component) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)
}
