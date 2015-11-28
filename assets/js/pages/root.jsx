/**
 * 入口组件
 * 与redux相关的处理在此添加
 */

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Home from './home.jsx'
import * as allActions from '../actions/game.jsx'

export function mapStateToProps(state = {}) {
  return {
    states: Object.assign({}, state)
  }
}

export function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators(allActions, dispatch)
  return {actions}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
