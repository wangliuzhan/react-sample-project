import React, {PropTypes} from 'react'
import Tabs from '../components/tabs.jsx'
import ajax from 'reqwest'
import Table from 'rc-table'
import _ from 'lodash'
import * as utils from '../utils/utils.jsx'

export default React.createClass({
  propTypes: {
    mode: PropTypes.oneof(['table', 'chart']),
    title: PropTypes.any.isRequired,
    tabs: PropTypes.array.isRequired
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

  componentDidMount() {
    // TODO 使用标准API
    this.refs.mainTab.refs.child0.click()
  },

  // 生成Tabs
  getTabs(items) {
    return <Tabs ref="mainTab" name="child" items={items} onTabClick={this.handconstabClick}/>
  },

  // 生成概览数据
  getGlance() {
    const labels = []
    const values = []
    this.state.glance.forEach((item) => {
      labels.push(item.k)
      values.push(item.V)
    })

    const label = labels.map((item, index) => {
      const splitTag = index === labels.length - 1 ? ':' : '|'
      return <span key={item}>{item} <em>{splitTag}</em></span>
    })
    const value = values.map((item, index) => {
      const endTag = index === values.length - 1 ? '' : <em>|</em>
      return <span key={item} className="red"><b>{item}</b> {endTag}</span>
    })

    return <div className="panel-glance">{label} {value}</div>
  },

  // TODO 是否可能支持mustache模板配置
  getDataGrid() {
    let config = _.find(this.props.tabs, {name: this.state.tabName})
    config = config || this.props.tabs[0]

    if (!config.table) {
      throw new Error('缺少列配置信息:cols')
    }

    return (
      <Table columns={config.table} data={this.state.datalist} className="table" />
    )
  },

  // TODO 完成分页
  getPager() {

  },

  // TODO 开始画图
  getChart() {

  },

  handconstabClick(item, i) {
    ajax({
      url: item.url,
      data: utils.tryExec(item.data)
    }).then((response) => {
      this.setState({
        datalist: response.content,
        glance: response.glance,
        labels: response.name,
        tabName: item.name
      })
    })
  },

  // 切换表格图表
  switchMode(e) {
    if (e.target.className.indexOf('active') > -1) return

    this.setState({
      mode: this.state.mode === 'table' ? 'chart' : 'table'
    })
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
              {this.getDataGrid()}
            </div>

            <div className="panel-chart">

            </div>
          </div>

          <div className="panel-footer">

          </div>
        </div>
      </div>
    )
  }
})
