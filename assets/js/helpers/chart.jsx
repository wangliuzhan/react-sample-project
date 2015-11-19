import _ from 'lodash'
import * as utils from '../utils/utis.jsx'

function transfrom2PieData(data) {
  return _.map(data.content, (item) => {
    return {
      name: item.x,
      y: item.y0,
      events: {
        // TODO 饼图点击事件
        click: function() {}
      }
    }
  })
}

export function pie(data) {
  return {
    chart: {
      type: 'pie'
    },
    title: {
      text: ''
    },
    tooltip: {
      backgroundColor: 'rgba(41, 55, 69, 0.8)',
      borderColor: '#010202',
      borderRadius: 5,
      shadow: true,
      style: {
        color: '#FFFFFF'
      },
      formatter: function() {
        return '<b>' + this.point.name + '</b>: ' + (this.percentage).toFixed(2) + '%' + '(' + this.y + ')'
      },
      percentageDecimals: 1
    },
    legend: {
      borderWidth: 0,
      layout: 'vertical',
      verticalAlign: 'right',
      align: 'right',
      x: -10,
      y: 0,
      itemMarginTop: 5,
      itemMarginBottom: 5,
      enabled: true
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 35,
        dataLabels: {
          enabled: true,
          color: '#000000',
          connectorColor: '#000000',
          formatter: function() {
            return '<b>' + this.point.name + '</b>: ' + (this.percentage).toFixed(2) + ' %'
          }
        },
        showInLegend: true
      }
    },
    credits: {
      enabled: false
    },
    series: [
      {
        innerSize: '50%',
        data: transfrom2PieData(data)
      }
    ]
  }
}

/**
 * {data: {title:[], data: []}, titles:[] , type: []}
 */
export function line(data, param) {
  // TODO 处理配置与数据
  return ''
}
