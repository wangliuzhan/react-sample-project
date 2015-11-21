import React, {PropTypes} from 'react'
import ReactChart from 'react-highcharts'
import _ from 'lodash'
import * as ChartHelpers from '../helpers/chart.jsx'

export default React.createClass({
  propTypes: {
    options: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
  },

  render() {
    let chart = this.props.options.chart
    let param = chart && chart.type === 'pie' ? this.getPieOptions() : this.getLineOptions()
    // TODO 使用公用的暂无数据样式
    if (!param.series.length) return <div>暂无数据</div>

    console.log(param)

    return <ReactChart config={param} />
  },

  getLineOptions() {
    let options = ChartHelpers.getLineOptions(this.props.data, this.props.options)
    //构建图表
    return _.merge({}, ChartHelpers.DEFAULT_LINE_OPTIONS, options)
  },

  // 饼图配置比较简单
  getPieOptions() {
    let options = ChartHelpers.getPieOptions(this.props.data, this.props.options)
    return _.merge({}, ChartHelpers.DEFAULT_PIE_OPTIONS, options)
  }
})
