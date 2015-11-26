/**
 * 全局路由配置
 */

import React from 'react'
import {Route, Router} from 'react-router'
import {connect} from 'react-redux'
import Home from '../pages/home.jsx'
import RealTime from '../pages/realtime.jsx'
import Event from '../pages/event.jsx'
import _ from 'lodash'
import {ACTION_CREATOR_MAP} from '../config.jsx'
import * as utils from '../utils/utils.jsx'

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
  Object.keys(ACTION_CREATOR_MAP).forEach((moduleName) => {
    let creator = utils.getExposedModule(ACTION_CREATOR_MAP[moduleName])
    Object.keys(creator).forEach((action) => {
      let handler = utils.getExposedModule(creator[action])
      debugger
      // default, __esModule
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
