// TODO redux utils

import {ACTION_REDUCER_MAP, ACTION_CREATOR_MAP} from '../config.jsx'
import _ from 'lodash'
import * as utils from '../utils/utils.jsx'

export function combinedReducer(state, action) {
  let meta = action.type.split('_')
  let fileName = meta.shift()
  let module = ACTION_REDUCER_MAP[fileName]
  let funcName = _.camelCase(meta.join('_'))
  let handler = module && module[funcName]
  if (!module || typeof handler !== 'function') {
    console.warn(`${action.type}找不到匹配的处理函数`)
  }

  // NOTE action.type = '@@REDUX init'
  return handler ? handler(state, action) : state
}


/**
 * 状态数据都存储在states属性
 */
export function mapStateToProps(state = {}) {
  return {
    states: Object.assign({}, state)
  }
}

/**
 * 最终传递给组件props的actions形式如下：
 * onGameCreate => 对应actions/game.jsx (create)
 */
export function mapDispatchToProps(dispatch) {
  let actions = {}
  Object.keys(ACTION_CREATOR_MAP).forEach((moduleName) => {
    let creator = utils.getExposedModule(ACTION_CREATOR_MAP[moduleName])
    Object.keys(creator).forEach((action) => {
      let handler = utils.getExposedModule(creator[action])
      if (!_.isFunction(handler)) return

      let realActionName = _.camelCase(['on', moduleName, action].join('_'))
      // 传递数据只用一个参数，参见action/*.jsx
      actions[realActionName] = (data) => {
        dispatch(handler(data))
      }
    })
  })

  return {actions}
}