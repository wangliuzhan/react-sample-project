import React, {PropTypes} from 'react'
import Panel from '../widgets/panel.jsx'

export default React.createClass({
  propTypes: {
    params: PropTypes.object
  },

  render() {
    const tabs = [
      {
        label: '国家留存',
        name: 'player',
        url: '/mock/retain.json',
        data: {
          uid: 1
        },
        chart: {

        },
        table: [
          {title: '国家', dataIndex: 'x', key:'x', width: 100},
          {title: '付费金额', dataIndex: 'y0', key:'y0', width: 100},
          {title: '付费次数', dataIndex: 'y1', key:'y1', width: 200}
        ]
      }
    ]

    const tabs1 = [
      {
        label: '城市留存',
        name: 'pay',
        url: '/mock/server.json',
        data: function() {
          return {
            uid: 1,
            appid: 2
          }
        },
        chart: {

        },
        table: [
          {title: '事件名称', dataIndex: 'eventName', key:'0', width: 100},
          {title: '昨日消息数', dataIndex: 'yesterdayMsgCount', key:'1', width: 100},
          {title: '今日消息数', dataIndex: 'todayMsgCount', key:'2', width: 200}
        ]
      }
    ]

    return (
      <div className="txt-blue">
        <h2>Page - Realtime</h2>
        <br />
        <Panel tabs={tabs} title="付费分析(客户端分页)" />
        <Panel tabs={tabs1} title="自定义事件(服务端分页)" server />
        <a href={'#/event/' + this.props.params.appID}>Go to event</a>
      </div>
    )
  }
})
