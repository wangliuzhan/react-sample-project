/**
 * NOTE
 * reducer action映射配置
 * 避免手动写无聊的actions函数
 *
 * 规则：
 * 比如GameReducer下的create函数
 * 对应的props => actions.onGameCreate
 * 对应的action.type => game_create
 *
 * 如果函数名是驼峰表示法，比如createChannel
 * 则对应的props => actions.onGameCreateChannel
 * 对应的action.type => game_create_channel
 */

import * as GameReducer from './game.jsx'

export default {
  // 这里的键值只能为纯小写的英文字符
  game: GameReducer
}
