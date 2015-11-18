import React, {PropTypes} from 'react'

export default React.createClass({
  propTypes: {
    appID: PropTypes.string
  },

  render() {
    const appIDSwitcher = this.props.appID ? (
      <select>
        <option>appID1</option>
        <option>appID2</option>
      </select>
    ) : ''

    return (
      <div id="header">
        <h1>React sample project</h1>
        {appIDSwitcher}
      </div>
    )
  }
})
