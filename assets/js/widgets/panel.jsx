import React from 'react'
import Tabs from '../components/tabs.jsx'
import ajax from 'reqwest'
import * as utils from '../utils/utils.jsx'

var Panel = React.createClass({
  getInitialState() {
    return {
      // 表格数据源
      datalist: [],
      mode: this.props.mode === 'table' ? 'table' : 'chart',
      // 数据概览
      glance: [],
      // 图表曲线名称
      labels: {}
    }
  },

  getDefaultProps() {
    return {
      // 指标说明
      index: [],
      // 是否可以下载
      download: true,
      // 是否可以全屏
      fullscreen: true,
      // 默认展示模式（图形或者表格）
      mode: 'chart'
    }
  },

  render() {
    return (
      <div className="panel-wrapper">
        <div className="panel panel-primary">
          <div className="panel-heading">
            {this.props.title}
          </div>

          <div className="panel-body">
            <div className="panel-primary-tabs">
              {this.getTabs(this.props.tabs)}
            </div>

            <div className="panel-secondary-tabs">
              二级TAB
            </div>

            {this.getGlance()}

            <div className="panel-switcher">
              <a href="javascript:;"
                className={'btn btn-default btn-xs ' + (this.state.mode === 'chart' ? 'active' : '')}
                onClick={this.switchMode}>
                <i className="fa fa-area-chart"></i>
              </a>
              <a href="javascript:;"
                className={'btn btn-default btn-xs ' + (this.state.mode === 'table' ? 'active' : '')}
                onClick={this.switchMode}>
                <i className="fa fa-table"></i>
              </a>
            </div>

            <div className="panel-table">
            </div>

            <div className="panel-chart">

            </div>
          </div>

          <div className="panel-footer">

          </div>
        </div>
      </div>
    )
  },

  handleTabClick(item, i) {
    ajax({
      url: item.url,
      data: utils.tryExec(item.data)
    }).then((response) => {
      this.setState({
        datalist: response.content,
        glance: response.glance,
        labels: response.name
      })
    })
  },

  // 生成Tabs
  getTabs(items) {
    return <Tabs items={items} onTabClick={this.handleTabClick}/>
  },

  // 生成概览数据
  getGlance() {
    var labels = []
    var values = []
    this.state.glance.forEach((item) => {
      labels.push(item.k)
      values.push(item.V)
    })

    var label = labels.map((item, index) => {
      return <span key={item}>{item} <em>{index === labels.length -1 ? ':' : '|'}</em></span>
    })
    var value = values.map((item, index) => {
      var endTag = index === values.length -1 ? '' : <em>|</em>
      return <span key={item} className="red"><b>{item}</b> {endTag}</span>
    })

    return <div className="panel-glance">{label} {value}</div>
  },

  // TODO 生成分页表格
  getDataGrid() {

  },

  // TODO 开始画图
  getChart() {

  },

  // 切换表格图表
  switchMode(e) {
    if (e.target.className.indexOf('active') > -1) return

    this.setState({
      mode: this.state.mode === 'table' ? 'chart' : 'table'
    })
  }
})

export default Panel
