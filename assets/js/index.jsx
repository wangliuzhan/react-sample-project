import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import routes from './routes/index.jsx'
import createStore from './store/index.jsx'

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
