import React from 'react'
import {Collapse} from 'react-bootstrap'

export default React.createClass({
  getDefaultProps() {
    return {
      item: {}
    }
  },

  getInitialState() {
    return {
      isOpen: false
    }
  },

  render() {
    return (
      <li>
        <span onClick={ ()=> this.setState({ open: !this.state.open })}>{this.props.item.name}</span>
        <Collapse in={this.state.open}>
          <ul className="menu_ul">
            {this.props.item.subs.map((sub) => {
              return <Item key={sub.name} li={sub}/>
            })}
          </ul>
        </Collapse>
      </li>
    )
  }
})

let Item = React.createClass({
  getDefaultProps() {
    return {
      li: {}
    }
  },

  render() {
    return (
      <li>
        <a href={this.props.li.href}>{this.props.li.name}</a>
      </li>
      )
  }
})
