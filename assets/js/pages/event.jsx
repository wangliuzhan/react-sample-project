import React, {PropTypes} from 'react'

export default React.createClass({
  propTypes: {
    actions: PropTypes.object
  },

  handleClick() {
    this.props.actions.onGameCreate({
      gameItem: {
        name: '测试游戏'
      }
    })
  },

  render() {
    return (
      <div className="txt-red">
        event
        <button onClick={this.handleClick}>Add Game</button>
      </div>
    )
  }
})
