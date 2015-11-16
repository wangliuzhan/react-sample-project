import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route} from 'react-router'
import Home from './pages/home.jsx'
import RealTime from './pages/realtime.jsx'
import Event from './pages/event.jsx'

var App = React.createClass({
  render() {
    return <Router>
      <Route path="/" component={Home}>
        <Route path="realtime/:appID" component={RealTime} />
        <Route path="event/:appID" component={Event} />
      </Route>
    </Router>
  }
})

ReactDOM.render(<App />, document.querySelector('#container'))
