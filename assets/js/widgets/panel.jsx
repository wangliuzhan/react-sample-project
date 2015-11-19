import React, {PropTypes} from 'react'
import Tabs from '../components/tabs.jsx'
import Loading from '../components/loading.jsx'
import ajax from 'reqwest'
import Table from 'rc-table'
import Chart from 'react-highcharts'
import Pagination from 'rc-pagination'
import * as utils from '../utils/utils.jsx'
import * as chartHelps from '../helpers/chart.jsx'

export default React.createClass({
  propTypes: {
    title: PropTypes.any.isRequired,
    tabs: PropTypes.array.isRequired,
    mode: PropTypes.oneOf(['table', 'chart']),
    index: PropTypes.array,
    server: PropTypes.bool,
    download: PropTypes.bool,
    fullscreen: PropTypes.bool,
    // 数据转换函数
    transform: PropTypes.func
  },

  getDefaultProps() {
    return {
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
      // 是否正在加载数据
      isLoading: true,
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
    // 首次渲染时自动请求第一个Tab
    this.refs.mainTab.refs.child0.click()
  },

  // 生成概览数据
  getGlance() {
    if (!this.state.glance) return ''

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
    if (this.props.server) {
      return json.content.content
    }

    const start = (this.state.pageNum - 1) * this.state.pageSize
    const end = start + this.state.pageSize
    return json.content.slice(start, end)
  },

  // 获取总页数
  getTotal() {
    let data = this.state.json.content
    return this.props.server ? data.totalPage : Math.ceil(data.length / this.state.pageSize)
  },

  getCurrentTab() {
    return this.props.tabs[this.state.selectedTabIndex]
  },

  // 生成表格组件
  getDataGrid() {
    const config = this.getCurrentTab()

    if (!config.table) {
      return ''
    }

    return (
      <Table columns={config.table} data={this.getPagedData()} className="table" rowKey={config.rowKey} />
    )
  },

  // 生成翻页组件
  getPager() {
    return (
      <Pagination total={this.getTotal()} current={this.state.pageNum}
        pageSize={this.state.pageSize} onChange={this.onPageChange}
      />
    )
  },

  // 分页事件（服务端和客户端有所区别）
  onPageChange(pageNum) {
    if (this.props.server) {
      // TODO 支持二级Tab
      const tab = this.props.tabs[this.state.selectedTabIndex]
      this.onTabClick(tab, this.state.selectedTabIndex, pageNum)
    } else {
      this.setState({
        pageNum: pageNum
      })
    }
  },

  getChart() {
    let tab = this.getCurrentTab()
    if (!tab.chart) return ''

    // TODO 处理数据与表格配置
    let config = tab.chart
    return <Chart config={config} />
  },

  // tab切换事件（客户端分页只在tab切换时调用，服务端分页会在页码切换时也调用）
  onTabClick(item, i, pageNum) {
    this.setState({
      isLoading: true
    })

    let params = utils.tryExec(item.data) || {}
    // 服务端翻页时会多传一个页码参数
    if (this.props.server) {
      params.pageID = typeof pageNum === 'number' ? pageNum : 1
      params.pageSize = this.state.pageSize
    }

    ajax({
      url: item.url,
      data: params
    }).then((response) => {
      this.setState({
        json: this.props.transform ? this.props.transform(response) : response,
        glance: response.glance,
        labels: response.name,
        // 客户端分页读取当前页码id
        pageNum: params.pageID || this.state.pageNum,
        selectedTabIndex: i,
        selectedSubTabIndex: 0,
        isLoading: false
      })
    }).fail(() => {
      // TODO 错误处理
      this.setState({
        isLoading: false
      })
    })
  },

  // 生成Tabs组件
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
    let tableOrChart = this.state.mode === 'table' ? (
      <div className="panel-table">
        {this.getDataGrid()}
        {this.getPager()}
      </div>
    ) : (
      <div className="panel-chart">
        {this.getChart()}
      </div>
    )

    return (
      <div className="panel-wrapper">
        <div className="panel panel-primary">
          <div className="panel-heading">
            {this.props.title}
          </div>

          <div className="panel-body">
            <Loading done={!this.state.isLoading}>
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

              {tableOrChart}
            </Loading>
          </div>

          <div className="panel-footer">

          </div>
        </div>
      </div>
    )
  }
})
