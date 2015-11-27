/**
 * 入口组件
 * 与redux相关的处理在此添加
 */

import Home from './home.jsx'
import * as ReduxUtils from '../helpers/redux.jsx'

export default ReduxUtils.connectComponent(Home)
