import React, {PropTypes} from 'react'
import ReactChart from 'react-highcharts'
import _ from 'lodash'

Highcharts.setOptions({
  colors: [
    '#4da1ff', '#f4533c', '#ffae00', '#1aba9b', '#e552b0', '#af6bcb', '#9aab4f', '#6673d1', '#3ebb43',
    '#2c81e1', '#dd4544', '#e49518', '#0c967b', '#bd3998', '#944cb2', '#7b8d43', '#4e5ab0', '#299e2e',
    '#1665bd', '#bd3b47', '#d97707', '#06715d', '#8f2e73', '#7b3499', '#69821c', '#4a498f', '#18851d'
  ]
})

// 之前有的地方都是传函数名，现在需要直接传函数
function warnIfNotFunc(x) {
  if (typeof x === 'string') {
    throw new Error(`直接传入函数而不是字符串：${x}`)
  }
}

function transform2PieData(data, options) {
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

function transform2LineData(data, options) {
    //筛选数据
  let keys = options.filterJson && options.filterJson.split(',')
  let newJson = {}
  newJson.content = []
  newJson.name = {}
  _.each(keys, function(key) {
    newJson.name[key] = data.name[key]
  })
  _.each(data.content, function(item) {
    let obj = {}
    obj.x = item.x
    _.each(keys, function(key) {
      obj[key] = item[key]
    })
    newJson.content.push(obj)
  })
  let json = keys ? newJson : json
    // json.name存储各个字段的名称
    //  找到在Y轴显示的key
  let yAxisKeys = _.keys(json.name).sort().filter(function(i) {
    return i[0] === 'y'
  })
  let symbols
  if (options.yAxisSymbols && options.yAxisSymbols.indexOf(':') === 0) {
    symbols = []
    _.map(json.name, function() {
      symbols.push(options.yAxisSymbols.replace(':', ''))
    })
  } else {
    symbols = options.yAxisSymbols && options.yAxisSymbols.split(',')
  }

  //Y轴是否示小数
  let allowDecimals = []
  if (options.allowDecimals) {
    _.map(json.name, function() {
      allowDecimals.push(parseInt(options.allowDecimals.replace(':', ''), 10))
    })
  }

  let stymbolsPos = options.yAxisSymbolsPos

  let param = {
    // 数据内容
    data: {
      // X轴数据，一维数组
      xAxisList: _.map(json.content, (item) => {
        warnIfNotFunc(options.xAxisFormatter)

        return {
          text: options.xAxisFormatter ? options.xAxisFormatter(item.x) : item.x,
          custom: item
        }
      }),
      // Y轴数据
      yAxisList: _.map(yAxisKeys, function(key, i) {
        return _.map(json.content, function(row) {
          let itemValue = row[key] || 0
          let value = symbols && symbols[i] === '%' ? Number((itemValue * 100).toFixed(2)) : Number(itemValue.toFixed(2))
          return options.yAxisFormatter ? options.yAxisFormatter(value) : value
        })
      })
    },
    // 各个曲线的名称
    titles: _.map(yAxisKeys, function(key) {
      warnIfNotFunc(options.titleFormatter)
      return options.titleFormatter ? options.titleFormatter(json.name[key]) : json.name[key]
    }),
    // 各个曲线的线条类型
    types: options.types ? options.types.split(',') : ['areaspline'],
    dashStyle: options.dashStyle || 'solid',
    colors: options.colors && options.colors.split(','),
    yAxisRightIndexes: (options.yAxisRightIndexes || options.yAxisRightIndexes === 0) && String(options.yAxisRightIndexes).split(',').map(function(i) {
      return parseInt(i, 10)
    }),
    // Y轴和tooltip附加的单位，比如%
    symbols: symbols,
    stymbolsPos: stymbolsPos,
    allowDecimals: allowDecimals,
    //需要隐藏的曲线（或柱子）
    hideLine: (options.hideLine || options.hideLine === 0) && String(options.hideLine).split(',').map(function(i) {
      return parseInt(i, 10)
    })
  }

  // 百分后缀，可以传入函数或者字符串去根节点找函数
  warnIfNotFunc(options.suffix)
  param.suffix = options.suffix

  // 柱状图纵向分组
  if (options.group) {
    param.group = []
      // 当总列不固定，但是只能确定少数列固定
    let autoFillIndex = -1
      // 已经明确指定的index
    let filled = []

    _.each(options.group, function(row, i) {
      warnIfNotFunc(row.suffix)

      let setting = {
        name: 'group' + i,
        tipsValue: [],
        yAxisSymbols: row.yAxisSymbols && row.yAxisSymbols.split(','),
        // 传递函数
        suffix: row.suffix
      }
        // 明确指定index，如果没有明确指定需要计算
      if (row.index || row.index === 0) {
        setting.index = String(row.index).split(',').map(function(item) {
          filled.push(item)
          return parseInt(item, 10)
        })
      } else {
        autoFillIndex = i
      }

      _.each(row.tipsValue, function(item) {
        // t0 => json.name.t0
        warnIfNotFunc(item.suffix)
        setting.tipsValue.push({
          name: json.name[item.name],
          suffix: item.suffix,
          indexName: item.name
        })
      })

      param.group.push(setting)
    })

    // 只有一列未知
    if (autoFillIndex > -1) {
      let indexes = []
      _.keys(json.content[0]).forEach(function(key) {
        if (key.indexOf('y') > -1) {
          let indexStr = key.replace('y', '')
          if (filled.indexOf(indexStr) === -1) {
            indexes.push(parseInt(indexStr, 10))
          }
        }
      })

      param.group[autoFillIndex].index = indexes
    }
  }

  // 堆叠
  if (options.stacking) {
    param.stacking = options.stacking
  }
  return param
}

// 判断x轴展示数据是否过长
function cutItem(data) {
  let arr = []
  for (let i = 0; i < data.length; i++) {
    //储存自定义xAxis
    let custom = data[i].custom ? JSON.stringify(data[i].custom) : ''
    if (data.length > 10) {
      //转换汉字为英文,得出真正的字符长度
      let n = 0
      for (let j = 0; j < data[i].text.length; j++) {
        n = n + data[i].text[j].replace(/^[\u4E00-\u9FFF]/, 'aa').length
      }
      if (n > 20) {
        //item字符过长进行截取
        if (data[i].text.length === n) {
          arr.push("<em data-custom='" + custom + "' title='" + data[i].text + "'>" + data[i].text.slice(0, 20) + '</em>...')
        } else if (data[i].text.length >= n / 2) {
          arr.push("<em data-custom='" + custom + "' title='" + data[i].text + "'>" + data[i].text.slice(0, 10) + '</em>...')
        }
      } else {
        arr.push("<em data-custom='" + custom + "' title='" + data[i].text + "'>" + data[i].text + '</em>')
      }
    } else {
      arr.push("<em data-custom='" + custom + "' title='" + data[i].text + "'>" + data[i].text + '</em>')
    }
  }

  return arr
}

export default React.createClass({
  propTypes: {
    options: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['pie', 'line'])
  },

  getDefaultProps() {
    return {
      type: 'line'
    }
  },

  render() {
    let param = this.props.type === 'line' ? this.getLineOptions() : this.getPieOptions()
    // TODO 使用公用的暂无数据样式
    if (!param) return <div>暂无数据</div>

    return <ReactChart config={param} />
  },

  getLineOptions() {
    let param = transform2LineData(this.props.data, this.props.options)
    //xAxis数据
    let xAxisList = param.data.xAxisList
    // 只有一条曲线时是否展示位点
    let pointFlag = xAxisList.length === 1
    //xAxis步长
    let step = Math.ceil(xAxisList.length / 12)
    let axis = []
    let seriesList = []
    for (let i = 0; i < param.data.yAxisList.length; i++) {
      //绘制曲线数据
      let obj = {}
      obj.data = param.data.yAxisList[i]
      obj.name = param.titles[i]
      obj.type = param.types[i]
      obj.visible = true
      //图表点击事件
      if (param.events) {
        obj.events = {
          click : param.events
        }
      }

      //分组
      if (param.group) {
        _.each(param.group, (j, item) => {
          if ( item.index.indexOf(i) > -1) {
            obj.stack = item.name
            return false
          }
          obj.stack = item.name
        })
      }

      //隐藏曲线(默认为显示)
      if (param.hideLine) {
        if (param.hideLine.indexOf(i) > -1) {
          //设置隐藏的曲线
          obj.visible = false
        }
      }
      //设置yAxis
      let objAxis = {
        title : {
          text : ''
        },
        min : 0,
        gridLineColor : '#E0E0E0',
        gridLineDashStyle : 'Dash',
        allowDecimals: param.allowDecimals && !!param.allowDecimals[i], //是否允许刻度有小数
        labels : {
          style : {
            fontFamily : 'Arial, "微软雅黑", "宋体"'
          },
          formatter : this.funLeft(param.symbols ? param.symbols[i] : null, param.stymbolsPos)
        }
      }
      //自定义曲线色
      if (param.colors) {
        obj.color = param.colors[i]
      }
      //指定坐标显示在右侧
      if (param.yAxisRightIndexes) {
        obj.yAxis = 1
        if (param.yAxisRightIndexes.indexOf(i) > -1) {
          objAxis.opposite = true
          obj.yAxis = i
        }
      }
      seriesList.push(obj)
      axis.push(objAxis)
    }
    //只有两条曲线时（规则已改变）
    if (param.data.yAxisList.length === 2) {
      if (param.yAxisRightIndexes) {
        delete seriesList[0].yAxis
        seriesList[1].yAxis = 1
      }
    }
    //图表类型
    let chart = {
      type : param.types[0],
      backgroundColor : 'rgba(0,0,0,0)'
    }

    //tips特殊值
    let tooltipSpecial = this.tooltip(param)
    if (param.special) {
      tooltipSpecial = param.special
    }

    let n = _.uniq(_.map(_.filter(seriesList, {type: 'column', visible: true}), function (item) {
      return item.stack || ''
    })).length

    let width = param.data.yAxisList[0].length > 3 ? null : 40
    let pointWidth = n > 2 ? width : 40

    let groupPadding = {
      '1': 0.1,
      '2': 0.42,
      '3': 0.38,
      '4': 0.34,
      '5': 0.30
    }

    //构建图表
    return {
      chart : chart,
      title : {
        text : ''
      },
      legend : {
        borderWidth : 0,
        enabled : !param.hideLegend,
        margin : 0,
        maxHeight : 50,
        itemStyle : {
          color : '#636A7C',
          fontWeight : 'normal'
        }
      },
      xAxis : {
        categories : cutItem(xAxisList), //对xAxis数据重组(兼容xAxis item字符过长的问题)
        tickmarkPlacement : 1,
        gridLineColor : '#E8EBF2',
        gridLineWidth : 1,
        tickInterval : step,
        labels : {
          //rotation: 30, //x轴旋转角度
          maxStaggerLines : 1, //限定用多少行来显示轴轴标签自动地的避免某些标签的重叠。设置为1表示禁用重叠检测
          //useHTML: true,
          style : {
            fontSize : 12
          }
        }
      },
      yAxis : axis,
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
        useHTML : true,
        formatter : tooltipSpecial
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
            enabled : pointFlag,
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
            enabled : pointFlag,
            symbol : 'circle',
            radius : 3,
            fillColor : 'white',
            lineColor : null,
            lineWidth : 1
          }
        },
        area : {
          stacking : param.stacking, //是否启用堆叠
          fillOpacity : 0.7,
          lineWidth : 2,
          //shadow: true,//是否为曲线加阴影
          marker : {
            enabled : pointFlag,
            symbol : 'circle',
            radius : 3,
            fillColor : 'white',
            lineColor : null,
            lineWidth : 1
          }
        },
        bar : {
          stacking : param.stacking,
          dataLabels : {
            enabled : true
          }
          //pointWidth: param.data.yAxisList.length > 2 ? null : 15
        },
        column : {
          cursor : param.events ? 'pointer' : '',
          stacking : param.stacking,
          groupPadding: param.data.yAxisList[0].length > 2 ? 0.1 : groupPadding[n],
          pointWidth: pointWidth,
          events: {
            legendItemClick: function () {
              //改变柱子间隔
              n = this.visible ? (n - 1) : (n + 1)
              _.each(this.chart.series, function(i, item) {
                item.update({
                  groupPadding: groupPadding[n]
                })
              })
            }
          }
        }
      },
      series : seriesList
    }
  },

  getPieOptions() {
    let data = transform2PieData(this.props.data)
    if (!data || !data.length) return ''

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
          data: data
        }
      ]
    }
  }
})
