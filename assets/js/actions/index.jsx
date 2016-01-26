/**
 * 最终在pages里面调用action
 * this.props.actions.gameCreate(...)
 */

import _ from 'lodash'
import * as gameActions from './game.jsx'
import * as userActions from './user.jsx'

const actions = {
  game: gameActions,
  user: userActions
}

function convert(actionCreators) {
  let ret = {}
  _.each(actionCreators, (item, key) => {
    _.each(item, function(action, funcName) {
      let newActionName = _.camelCase(key + '_' + funcName)
      ret[newActionName] = action
    })
  })

  return ret
}

export default convert(actions)
