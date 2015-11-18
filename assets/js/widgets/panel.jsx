import React, {PropTypes} from 'react'
import Tabs from '../components/tabs.jsx'
import ajax from 'reqwest'
import Table from 'rc-table'
import Pagination from 'rc-pagination'
import * as utils from '../utils/utils.jsx'

export default React.createClass({
  propTypes: {
    title: PropTypes.any.isRequired,
    tabs: PropTypes.array.isRequired,
    mode: PropTypes.oneOf(['table', 'chart']),
    index: PropTypes.array,
    server: PropTypes.bool,
    download: PropTypes.bool,
    fullscreen: PropTypes.bool
  },

  getDefaultProps() {
    return {
      title: '',
      tabs: [],
      // 默认展示模式（图形或者表格）
      mode: 'chart',
      // 指标说明
      index: [],
      // 服务端分页
      server: false,
      // 是否可以下载
      download: true,
      // 是否可以全屏
      fullscreen: true,
    }
  },

  getInitialState() {
    return {
      // 服务器源数据
      json: {
        content: []
      },
      pageNum: 1,
      pageSize: 1,
      // 一级tab选中项目
      selectedTabIndex: 0,
      // 二级tab选中项目
      selectedSubTabIndex: 0,
      // 图形表格切换
      mode: this.props.mode === 'table' ? 'table' : 'chart',
      // 数据概览
      glance: [],
      // 图表曲线名称
      labels: {}
    }
  },

  componentDidMount() {
    this.refs.mainTab.refs.child0.click()
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

  /**
   * 获取翻页数据
   */
  getPagedData() {
    const json = this.state.json
    if (!json.content) return []

    let datalist
    if (!this.props.server) {
      const start = (this.state.pageNum - 1) * this.state.pageSize
      const end = start + this.state.pageSize
      datalist = json.content.slice(start, end)
    } else {
      datalist = json.content
    }

    return datalist
  },

  getTotal() {
    return this.props.server ? this.state.json.content.totalRecord : this.state.json.content.length
  },

  getDataGrid() {
    const config = this.props.tabs[this.state.selectedTabIndex]

    if (!config.table) {
      throw new Error('缺少列配置信息:cols')
    }

    return (
      <Table columns={config.table} data={this.getPagedData()} className="table" />
    )
  },

  getPager() {
    return (
      <Pagination total={this.getTotal()} current={this.state.pageNum}
        pageSize={this.state.pageSize} onChange={this.onPageChange}
      />
    )
  },

  onPageChange(pageNum) {
    this.setState({
      pageNum: pageNum
    })

    if (this.props.server) {
      // 找到当前tab
      // TODO 支持二级Tab
      const tab = this.props.tabs[this.state.selectedTabIndex]
      this.onTabClick(tab, this.state.selectedTabIndex)
    }
  },

  // TODO 开始画图
  getChart() {

  },

  onTabClick(item, i) {
    ajax({
      url: item.url,
      data: utils.tryExec(item.data),
      pageID: this.state.pageNum,
      pageSize: this.state.pageSize
    }).then((response) => {
      this.setState({
        json: response,
        glance: response.glance,
        labels: response.name,
        // 翻页和子tab索引位置都需要更新
        pageNum: 1,
        selectedTabIndex: i,
        selectedSubTabIndex: 0
      })
    })
  },

  // 生成Tabs
  getTabs(items) {
    return <Tabs ref="mainTab" name="child" items={items} onTabClick={this.onTabClick}/>
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
              {this.getPager()}
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
