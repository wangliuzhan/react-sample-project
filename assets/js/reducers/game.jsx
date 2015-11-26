/**
 * 需要传递的数据都在action的data属性上
 */
export default function(state, action) {
  if (action.type === 'create') {
    console.log('creating...', action.data)
    return Object.assign({}, state, {
      createdItem: action.data
    })
  }


  if (action.type === 'del') {
    console.log('deleting...', action.data)
    return Object.assign({}, state, {
      removedItemID: action.data
    })
  }

  return state
}
