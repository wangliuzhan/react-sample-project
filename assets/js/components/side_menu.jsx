import React, {PropTypes} from 'react'

export default React.createClass({
  propTypes: {
    items: PropTypes.array.isRequired
  },

  getDefaultProps() {
    return {
      items: []
    }
  },

  getInitialState() {

  },

  render() {
    return (
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    )
  }
})
