import React from 'react'

var Panel = React.createClass({
  onTabChange() {
    console.log(arguments)
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
            </div>

            <div className="panel-secondary-tabs">
              <ul className="nav nav-tabs">
                <li role="presentation" className="active">
                  <a href="#">日平均活跃</a>
                </li>
                <li role="presentation">
                  <a href="#">七日平均活跃</a>
                </li>
                <li role="presentation">
                  <a href="#">30日平均活跃</a>
                </li>
              </ul>
            </div>

            <div className="panel-galance">
              <span>老玩家</span>
              <em>|</em>
              <span>新增玩家</span>
              <em>|</em>
              <span>付费玩家</span>
              <em>:</em>
              <span className="red">15</span>
              <em className="red">|</em>
              <span className="red">197</span>
              <em className="red">|</em>
              <span className="red">146</span>
            </div>

            <div className="panel-switcher">

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
  }
})

export {Panel}
