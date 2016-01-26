import {combineReducers} from 'redux'
import gameReducer from './game.jsx'
import errorReducer from './error.jsx'

export default combineReducers({
  game: gameReducer,
  error: errorReducer
})
