import React, {PropTypes} from 'react'

export default React.createClass({
  propTypes: {
    li: PropTypes.object.isRequired
  },

  getDefaultProps() {
    return {
      li: {}
    }
  },

  render() {
    return (
      <li>
        <a href={this.props.li.href}>{this.props.li.name}</a>
      </li>
    )
  }
})

