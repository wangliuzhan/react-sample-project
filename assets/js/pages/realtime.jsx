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
        chartType: 'pie',
        chart: {

        },
        table: [
          {title: '国家', dataIndex: 'x', key:'1', width: 100},
          {title: '付费金额', dataIndex: 'y0', key:'2', width: 100},
          {title: '付费次数', dataIndex: 'y1', key:'3', width: 200}
        ],
        rowKey: (row) => {
          return row.id
        }
      }
    ]

    const tabs1 = [
      {
        label: '城市留存',
        name: 'pay',
        url: '/mock/server.json',
        chartType: 'pie',
        data: function() {
          return {
            uid: 1,
            appid: 2
          }
        },
        chart: {

        },
        table: [
          {title: '事件名称', dataIndex: 'eventName', key: '1', width: 100},
          {title: '昨日消息数', dataIndex: 'yesterdayMsgCount', key: '2', width: 100},
          {title: '今日消息数', dataIndex: 'todayMsgCount', key: '3', width: 200}
        ],
        rowKey: (row) => {
          return row.eventID
        }
      }
    ]

    const tab2 = [
      {
        label: '付费次数',
        name: 'pay',
        url: '/mock/retain2.json',
        data: function() {
          return {
            uid: 1,
            appid: 2
          }
        },
        chart: {
          yAxisRightIndexes: [1],
          seriesTypes: ['column', 'spline'],
          seriesNames: ['付费次数', '付费占比'],
          yAxisSymbols: ['', '%'],
          yAxisOppositeList: ['y0'],
          tooltipOrderList: ['y1', 'a', 'y0'],
          tooltipExtraData: {
            'a': ['额外数据', 9527]
          },
          yAxisFormatter: function(value, name) {
            if (name === 'y1') return parseFloat((value * 100).toFixed(2))

            return value
          },
          yAxisLabelsFormatter: function(name, index) {
            return this.value + (name === 'y0' ? '!' : '#')
          }
        },
        table: [
          {title: '区间', dataIndex: 'x', key: '1', width: 100},
          {title: '付费次数', dataIndex: 'y0', key: '2', width: 100},
          {title: '付费占比', dataIndex: 'y1', key: '3', width: 200}
        ],
        rowKey: (row) => {
          return row.x
        }
      }
    ]

    return (
      <div className="txt-blue">
        <h2>Page - Realtime</h2>
        <br />
        <Panel tabs={tab2} title="付费次数(客户端分页)" />
        <a href={'#/event/' + this.props.params.appID}>Go to event</a>
      </div>
    )
  }
})
