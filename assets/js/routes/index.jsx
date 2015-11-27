/**
 * 全局路由配置
 * 与redux相关的不要写在此文件中
 */

import React from 'react'
import {Route, Router} from 'react-router'
import Root from '../pages/root.jsx'
import RealTime from '../pages/realtime.jsx'
import Event from '../pages/event.jsx'

export default (
  <Router>
    <Route path="/" component={Root}>
      <Route path="realtime/:appID" component={RealTime} />
      <Route path="event/:appID" component={Event} />
    </Route>
  </Router>
)
