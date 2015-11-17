import React from 'react'
import Panel from '../widgets/panel.jsx'

export default React.createClass({
  render() {
    var tabs = [
      {
        label: '国家留存',
        value: 'player',
        url: '/mock/retain.json',
        data: {
          uid: 1
        },
        chart: {

        }
      },
      {
        label: '城市留存',
        value: 'pay',
        url: '/mock/retain2.json',
        data: function() {
          return {
            uid: 1,
            appid: 2
          }
        },
        chart: {

        }
      }
    ]

    return (
      <div className="txt-blue">
        <h2>Page - Realtime</h2>
        <br />
        <Panel tabs={tabs} title="留存" />
        <a href={'#/event/' + this.props.params.appID}>Go to event</a>
      </div>
    )
  }
})
