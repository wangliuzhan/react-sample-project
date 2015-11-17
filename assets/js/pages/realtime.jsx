import React from 'react'
import Panel from '../widgets/panel.jsx'

export default React.createClass({
  render() {
    var cols = [
      {title: '国家', dataIndex: 'x', key:'x',width: 100},
      {title: '付费金额', dataIndex: 'y0', key:'y0', width: 100},
      {title: '付费次数', dataIndex: 'y1',  key:'y1',width: 200}
    ]

    var tabs = [
      {
        label: '国家留存',
        name: 'player',
        url: '/mock/retain.json',
        data: {
          uid: 1
        },
        chart: {

        },
        table: cols
      },
      {
        label: '城市留存',
        name: 'pay',
        url: '/mock/retain2.json',
        data: function() {
          return {
            uid: 1,
            appid: 2
          }
        },
        chart: {

        },
        table: cols
      }
    ]

    return (
      <div className="txt-blue">
        <h2>Page - Realtime</h2>
        <br />
        <Panel tabs={tabs} title="付费分析" />
        <Panel tabs={tabs} title="留存分析" />
        <a href={'#/event/' + this.props.params.appID}>Go to event</a>
      </div>
    )
  }
})
