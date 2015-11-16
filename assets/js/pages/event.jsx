import React from 'react'

export default React.createClass({
  render() {
    console.log(this.props.params)

    return (
      <div className="txt-red">
        event
      </div>
    )
  }
})
