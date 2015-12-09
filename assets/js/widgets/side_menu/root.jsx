import React from 'react'
import FirstClassItem from './first_class_item.jsx'

export default React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired
  },

  getDefaultProps() {
    return {
      items: [
        {
          'name': 'item_1',
          'href': '',
          'subs': [
            {
              'name': 'sub1',
              'href': ''
            },
            {
              'name': 'sub2',
              'href': ''
            }
          ]
        },
        {
          'name': 'item_2',
          'href': '',
          'subs': [
            {
              'name': 'sub1',
              'href': ''
            },
            {
              'name': 'sub2',
              'href': ''
            }
          ]
        }
      ]
    }
  },

  render() {
    return (
      <ul className="menu_ul">
        {this.props.items.map((item) => {
          return <FirstClassItem key={item.name} item={item}/>
        })}
      </ul>
    )
  }
})
