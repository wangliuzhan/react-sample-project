import React, {PropTypes} from 'react'

export default React.createClass({
  propTypes: {
    done: PropTypes.bool,
    children: PropTypes.any
  },

  getDefaultProps() {
    return {
      done: false
    }
  },

  render() {
    // TODO 遮罩效果
    let content = this.props.done ? '' : 'Loading ...'
    return (
      <div className="loading-container">
        {content}
        {this.props.children}
      </div>
    )
  }
})
