/**
 * NOTE
 * 这里的reducer会经过 helpers/redux.jsx 统一封装处理
 * 不需要判断action.type，只需要关注处理业务逻辑
 *
 * 每个reducer对应的action函数会自动生成
 * action.type等于文件模块名_函数名
 * 函数名必须准守驼峰表示法，最终转换为snakeCase(下划线间隔)的action.type
 * action有两个字段一个是type,一个是data
 */

export function create(state, action) {
  return Object.assign({}, state, {
    createdItem: action.data
  })
}

export function del(state, action) {
  return Object.assign({}, state, {
    removedItemID: action.data
  })
}
