import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import routes from './routes/index.jsx'
import * as ReduxUtils from './helpers/redux.jsx'

const store = createStore(ReduxUtils.combinedReducer)
let App = React.createClass({
  render() {
    return (
      <Provider store={store}>
        {routes}
      </Provider>
    )
  }
})

ReactDOM.render(<App />, document.querySelector('#container'))
