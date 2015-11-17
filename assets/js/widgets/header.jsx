import React from 'react'

export default React.createClass({
  render() {
    var appIDSwitcher = this.props.appID ? (
      <select>
        <option>appID1</option>
        <option>appID2</option>
      </select>
    ) : ''

    console.log('header')

    return (
      <div id="header">
        <h1>React sample project</h1>
        {appIDSwitcher}
      </div>
    )
  }
})
