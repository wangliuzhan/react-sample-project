import React from 'react'
import {Collapse} from 'react-bootstrap'
import Sub from './sub_item.jsx'

export default React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },

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
        <span onClick={ ()=> this.setState({open: !this.state.open})}>{this.props.item.name}</span>
        <Collapse in={this.state.open}>
          <ul className="menu_ul">
            {this.props.item.subs.map((sub) => {
              return <Sub key={sub.name} li={sub}/>
            })}
          </ul>
        </Collapse>
      </li>
    )
  }
})
