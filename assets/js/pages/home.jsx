import React from 'react'
import Header from '../widgets/header.jsx'
import Footer from '../widgets/footer.jsx'

export default React.createClass({
  render() {
    var games = [
      {appID: '1a', name: '权利的游戏'},
      {appID: '2b', name: '邪恶力量'}
    ]

    var tbody = games.map((item) => {
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

    var gameCenter =  (
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

    return (
      <div className="wrapper">
        <Header />
        {this.props.children || gameCenter}
        <Footer />
      </div>
    )
  }
})
