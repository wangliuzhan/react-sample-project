/**
 * 全局路由配置
 */

import React from 'react'
import {Route, Router} from 'react-router'
import {connect} from 'react-redux'
import actions from '../actions/game.jsx'
import Home from '../pages/home.jsx'
import RealTime from '../pages/realtime.jsx'
import Event from '../pages/event.jsx'

function mapStateToProps(state = {}) {
  return {
    gameItem: state.gameItem
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      onGameCreate: (gameItem) => dispatch({
        type: 'create',
        gameItem
      }),
      onGameDel: () => dispatch(actions.del)
    }
  }
}

let Entry = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

/**
 * using redux router to wrapper this
 */
export default (
  <Router>
    <Route path="/" component={Entry}>
      <Route path="realtime/:appID" component={RealTime} />
      <Route path="event/:appID" component={Event} />
    </Route>
  </Router>
)
