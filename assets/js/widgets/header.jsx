import React, {PropTypes} from 'react'

export default React.createClass({
  propTypes: {
    appID: PropTypes.string
  },

  render() {
    const appIDSwitcher = this.props.appID ? (
      <select>
        <option>appID1</option>
        <option>appID2</option>
      </select>
    ) : ''

    return (
      <div id="header">
        <div className="logo"><a href="/pages/home.jsp"></a></div>
        {appIDSwitcher}
        <div className="top-tool">
          <a className="top-menu" href="http://wiki.dataeye.com/tracking.html" target="_blank">
            <i className="fa fa-book"></i>
            &nbsp;开发者中心
          </a>
          <a href="javascript:;" id="userCenter" className="user-center">
            <i className="fa fa-user"></i>
            &nbsp;demo@dataeye.com
          </a>
          <a href="http://www.dataeye.com/ptlogin/user/logout.do" className="exit">
            <i className="fa fa-power-off"></i>
            &nbsp;注销
          </a>
        </div>
      </div>
    )
  }
})
