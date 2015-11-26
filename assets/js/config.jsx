import * as GameActionCreator from './actions/game.jsx'
import * as GameReducer from './reducers/game.jsx'

/**
 * 用于mapDispatchToProps时定义子组件使用的props.action
 * game(文件名) => 对应的模块
 * 最终输出：onGameCreate
 * 对应game.jsx里面的create函数
 */
export const ACTION_CREATOR_MAP = {
  game: GameActionCreator
}

export const ACTION_REDUCER_MAP = {
  game: GameReducer
}