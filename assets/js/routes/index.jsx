/**
 * 全局路由配置
 */

import React from 'react'
import {Route, Router} from 'react-router'
import {connect} from 'react-redux'
import Home from '../pages/home.jsx'
import RealTime from '../pages/realtime.jsx'
import Event from '../pages/event.jsx'
import GameActionCreator from '../actions/game.jsx'
import _ from 'lodash'

// 每个action对应自己的模块名称
let actionCreatorList = {
  game: GameActionCreator
}

/**
 * 状态数据都存储在states属性
 */
function mapStateToProps(state = {}) {
  return {
    states: Object.assign({}, state)
  }
}

/**
 * 最终传递给组件props的actions形式如下：
 * onGameCreate => 对应actions/game.jsx (create)
 */
function mapDispatchToProps(dispatch) {
  let actions = {}
  Object.keys(actionCreatorList).forEach((moduleName) => {
    let creator = actionCreatorList[moduleName]
    Object.keys(creator).forEach((action) => {
      let realActionName = _.camelCase(['on', moduleName, action].join('_'))
      actions[realActionName] = (data) => {
        dispatch(GameActionCreator[action](data))
      }
    })
  })

  return {actions}
}

let Entry = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default (
  <Router>
    <Route path="/" component={Entry}>
      <Route path="realtime/:appID" component={RealTime} />
      <Route path="event/:appID" component={Event} />
    </Route>
  </Router>
)
