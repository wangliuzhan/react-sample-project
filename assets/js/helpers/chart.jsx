import _ from 'lodash'
import * as utils from '../utils/utils.jsx'

Highcharts.setOptions({
  colors: [
    '#4da1ff', '#f4533c', '#ffae00', '#1aba9b', '#e552b0', '#af6bcb', '#9aab4f', '#6673d1', '#3ebb43',
    '#2c81e1', '#dd4544', '#e49518', '#0c967b', '#bd3998', '#944cb2', '#7b8d43', '#4e5ab0', '#299e2e',
    '#1665bd', '#bd3b47', '#d97707', '#06715d', '#8f2e73', '#7b3499', '#69821c', '#4a498f', '#18851d'
  ],
  lang: {
    noData: '暂无数据'
  }
})

export const DEFAULT_LINE_OPTIONS = {
  chart : {
    backgroundColor : 'rgba(0, 0, 0, 0)'
  },
  title : {
    text : ''
  },
  legend : {
    borderWidth : 0,
    margin : 0,
    maxHeight : 50,
    itemStyle : {
      color : '#636A7C',
      fontWeight : 'normal'
    }
  },
  xAxis : {
    tickmarkPlacement : 1,
    gridLineColor : '#E8EBF2',
    gridLineWidth : 1,
    labels : {
      // x轴旋转角度
      //rotation: 30,
      //限定用多少行来显示轴轴标签自动地的避免某些标签的重叠。设置为1表示禁用重叠检测
      maxStaggerLines : 1,
      //useHTML: true,
      style : {
        fontSize : 12
      }
    }
  },
  tooltip : {
    shared : true,
    valueSuffix : '',
    backgroundColor : 'rgba(41, 55, 69, 0.8)',
    borderColor : '#010202',
    borderRadius : 5,
    shadow : true,
    hideDelay : 10, //提示框隐藏延时。当鼠标移出图标后，数据提示框会在设定的延迟时间后消失。
    style : {
      zIndex : -1,
      color : '#FFFFFF',
      'pointer-events': 'none'
    },
    crosshairs : { //控制十字线
      width : 1,
      color : '#39B54A',
      dashStyle : 'shortdot'
    },
    useHTML : true
  },
  credits : {
    enabled : false
  },
  plotOptions : {
    areaspline : {
      fillOpacity : 0.08,
      lineWidth : 2,
      //shadow: true,//是否为曲线加阴影
      marker : {
        symbol : 'circle',
        radius : 3,
        fillColor : 'white',
        lineColor : null,
        lineWidth : 1
      }
    },
    spline : {
      fillOpacity : 0.08,
      lineWidth : 2,
      //shadow: true,//是否为曲线加阴影
      marker : {
        symbol : 'circle',
        radius : 3,
        fillColor : 'white',
        lineColor : null,
        lineWidth : 1
      }
    },
    area : {
      fillOpacity : 0.7,
      lineWidth : 2,
      //shadow: true,//是否为曲线加阴影
      marker : {
        symbol : 'circle',
        radius : 3,
        fillColor : 'white',
        lineColor : null,
        lineWidth : 1
      }
    },
    bar : {
      dataLabels : {
        enabled : true
      }
    },
    column : {
    }
  }
}

export const DEFAULT_PIE_OPTIONS = {
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
  }
}

// TODO
export function defaultTooltipFormatter() {
  return this.x
}

// TODO 纵坐标格式化
export function defaultYaxisLabelFormatter() {
  return this.value
}

// 转换原始接口数据为饼图数据
export function transform2PieData(data) {
  return _.map(data.content, (item) => {
    return {
      name: item.x,
      y: item.y0
    }
  })
}

export function transform2LineData(data, extraOptions) {
  // x轴的值
  let categories = _.map(data.content, (item) => {
    // TODO 自定义数据
    return item.x
    //return {
    //  // NOTE item.x表示横轴的值
    //  text: utils.tryTransform(extraOptions.categoryFormatter, null, item.x),
    //  custom: item
    //}
  })
  // x轴为时间序列，只有一条数据是否展示点
  let markerEnabled = categories.length === 1
  // 是否堆叠
  let stacking = extraOptions.stacking
  // x轴步长
  let tickInterval = Math.ceil(categories.length / 12)
  // 有点击事件鼠标样式为cursor
  let cursor = !!extraOptions.cursor
  // 是否展示图例，大部分情况默认为true
  let legendEnabled = utils.asBool(extraOptions.legendEnabled)
  let tooltipFomatter = defaultTooltipFormatter
  let yAxisKeys = _.keys(data.name).sort().filter((i) => {
    return i[0] === 'y'
  })
  let yAxisList = _.map(yAxisKeys, (key) => {
    return _.map(data.content, (row) => {
      return utils.tryTransform(extraOptions.yAxisFormatter, null, row[key] || 0)
    })
  })
  let series = []
  let yAxis = []
  _.each(yAxisList, (item, i) => {
    let index = 1
    let opposite = false
    if (_.isArray(extraOptions.yAxisRightIndexes)) {
      opposite = extraOptions.yAxisRightIndexes.indexOf(i) > -1
      index = i
    }

    series.push({
      data: item,
      name: utils.tryGet(extraOptions.seriesNames, i),
      type: utils.tryGet(extraOptions.seriesTypes, i),
      color: utils.tryGet(extraOptions.seriesColors, i),
      // TODO
      visible: true,
      // TODO group分组
      stack: '',
      yAxis: index,
      events: {
        click: extraOptions.onClick
      }
    })

    yAxis.push({
      title : {
        text : ''
      },
      opposite: opposite,
      min : 0,
      gridLineColor : '#E0E0E0',
      gridLineDashStyle : 'Dash',
      allowDecimals: !!utils.tryGet(extraOptions.allowDecimals, i), //是否允许刻度有小数
      labels : {
        style : {
          fontFamily : 'Arial, "微软雅黑", "宋体"'
        },
        formatter : defaultYaxisLabelFormatter
      }
    })
  })

  if (series.length === 2 && extraOptions.yAxisRightIndexes) {
    delete series[0].yAxis
    series[1].yAxis = 1
  }

  return {categories, markerEnabled, stacking, tickInterval, cursor, legendEnabled, tooltipFomatter, yAxis, series}
}

// 生成饼图基本配置
export function getPieOptions(data, options = {}) {
  return _.assign({
    series: [
      {
        innerSize: '50%',
        data: transform2PieData(data)
      }
    ]
  }, options)
}

// 生成曲线图、柱状图等配置
export function getLineOptions(data, options = {}) {
  let lineData = transform2LineData(data, options)
  return {
    series: lineData.series,
    chart: {
      // 图表类型，混合图的时候不需要指定type，在series里面指定type
      type: 'line'
    },
    legend: {
      enabled : lineData.legendEnabled
    },
    xAxis: {
      categories : lineData.categories,
      // x轴的步长
      tickInterval: lineData.tickInterval
    },
    yAxis: lineData.yAxis,
    tooltip: {
      formatter: lineData.tooltipFomatter
    },
    plotOptions: {
      areaspline: {
        marker: {
          enabled: lineData.markerEnabled
        }
      },
      spline: {
        marker: {
          enabled: lineData.markerEnabled
        }
      },
      area: {
        stacking: lineData.stacking,
        marker: {
          enabled: lineData.markerEnabled
        }
      },
      bar: {
        stacking: lineData.stacking
      },
      column: {
        cursor : lineData.cursor,
        stacking : lineData.stacking
      }
    }
  }
}
