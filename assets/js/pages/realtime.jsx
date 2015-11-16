import React from 'react'

export default React.createClass({
  render() {
    console.log(this.props.params)

    return (
      <div className="txt-blue">
        realtime
        <br />
        
        <a href={'#/event/' + this.props.params.appID}>Go to event</a>
      </div>
    )
  }
})
