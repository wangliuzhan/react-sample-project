import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import _ from 'lodash'
import routes from './routes/index.jsx'
import {ACTION_REDUCER_MAP} from './config.jsx'

function combinedReducer(state, action) {
  let meta = action.type.split('_')
  let fileName = meta.shift()
  let module = ACTION_REDUCER_MAP[fileName]
  let funcName = _.camelCase(meta.join('_'))
  let handler = module && module[funcName]
  if (!module || typeof handler !== 'function') {
    console.warn(`${action.type}找不到匹配的处理函数`)
  }

  // NOTE action.type = '@@REDUX init'
  return handler ? handler(state, action) : state
}

const store = createStore(combinedReducer)
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
