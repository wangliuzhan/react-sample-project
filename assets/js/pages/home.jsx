/**
 * 数据中心，入口页面
 */
import React, {PropTypes} from 'react'
import Header from '../widgets/header.jsx'
import Footer from '../widgets/footer.jsx'

export default React.createClass({
  propTypes: {
    children: PropTypes.any,
    actions: PropTypes.object.isRequired,
    states: PropTypes.object.isRequired
  },

  render() {
    const games = [
      {appID: '1a', name: '权利的游戏'},
      {appID: '2b', name: '邪恶力量'}
    ]

    const tbody = games.map((item) => {
      return (
        <tr key={item.appID}>
          <td>{item.name}</td>
          <td>{item.appID}</td>
          <td>
            <a href={'#/realtime/' + item.appID}>View</a>
          </td>
        </tr>
      )
    })

    const gameCenter = (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>游戏名称</th>
            <th>APPID</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {tbody}
        </tbody>
      </table>
    )

    // 作为入口页面接收redux所有的actions，不然子组件无法找到
    const body = !this.props.children ? gameCenter : React.cloneElement(this.props.children, {
      actions: this.props.actions,
      states: this.props.states
    })

    return (
      <div className="wrapper">
        <Header />
        {body}
        <Footer />
      </div>
    )
  }
})
