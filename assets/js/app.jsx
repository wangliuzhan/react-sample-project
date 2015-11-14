import React from 'react'
import ReactDOM from 'react-dom'
import {Panel} from './components/panel.jsx'
import Tabs from './components/tabs.jsx'

var App = React.createClass({
  onTabClick(item, i) {
    console.log(item, i)
  },

  render() {
    var items = [
      {
        label: 'x', value: '1'
      },
      {
        label: 'y', value: '2'
      },
      {
        label: 'z', value: '3'
      }
    ]
    return (
      <div>
        <Tabs items={items} onTabClick={this.onTabClick}>

        </Tabs>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.querySelector('.wrapper'))
