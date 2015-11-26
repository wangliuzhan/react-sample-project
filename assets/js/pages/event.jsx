import React, {PropTypes} from 'react'

export default React.createClass({
  propTypes: {
    actions: PropTypes.object
  },

  createGame() {
    this.props.actions.onGameCreate({
      name: '测试游戏'
    })
  },

  removeGame() {
    this.props.actions.onGameDel({
      id: 1
    })
  },

  render() {
    return (
      <div className="txt-red">
        event
        <button onClick={this.createGame}>Add Game</button>
        <br />
        <button onClick={this.removeGame}>Delete</button>
      </div>
    )
  }
})
