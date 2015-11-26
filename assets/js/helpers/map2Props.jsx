/**
 * redux helps to map xxx to props
 */

import GameActionCreator from '../actions/game.jsx'
import _ from 'lodash'

// 每个action对应自己的模块名称
let actionCreatorList = {
  game: GameActionCreator
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
  Object.keys(actionCreatorList).forEach((moduleName) => {
    let creator = actionCreatorList[moduleName]
    Object.keys(creator).forEach((action) => {
      let realActionName = _.camelCase(['on', moduleName, action].join('_'))
      // 传递数据只用一个参数，参见action/*.jsx
      actions[realActionName] = (data) => {
        dispatch(GameActionCreator[action](data))
      }
    })
  })

  return {actions}
}
