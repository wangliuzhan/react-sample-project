/**
 * 需要传递的数据都在action的data属性上
 */

export function create(state, action) {
  console.log('creating...', action.data)
  return Object.assign({}, state, {
    createdItem: action.data
  })
}

export function del(state, action) {
  console.log('deleting...', action.data)
  return Object.assign({}, state, {
    removedItemID: action.data
  })
}