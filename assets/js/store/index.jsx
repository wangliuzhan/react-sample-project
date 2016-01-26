import {createStore, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import restfulMiddleware from '../middlewares/ajax.jsx'
import rootReducers from '../reducers/index.jsx'

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
  duration: true
})

const finalStoreCreator = applyMiddleware(
	loggerMiddleware,
	restfulMiddleware
)(createStore)

export default (initialState = {}) => {
  return finalStoreCreator(rootReducers, initialState)
}
