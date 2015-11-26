/**
 * 全局路由配置
 */

import React from 'react'
import {Route, Router} from 'react-router'
import {connect} from 'react-redux'
import Home from '../pages/home.jsx'
import RealTime from '../pages/realtime.jsx'
import Event from '../pages/event.jsx'
import * as ReduxUtils from '../helpers/redux.jsx'

let Entry = connect(
  ReduxUtils.mapStateToProps,
  ReduxUtils.mapDispatchToProps
)(Home)

export default (
  <Router>
    <Route path="/" component={Entry}>
      <Route path="realtime/:appID" component={RealTime} />
      <Route path="event/:appID" component={Event} />
    </Route>
  </Router>
)
