import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {polyfill} from 'es6-promise'
import routes from './routes/index.jsx'
import createStore from './store/index.jsx'

polyfill()

const store = createStore()

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
