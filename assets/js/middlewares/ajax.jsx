/**
 * ajax请求中间件
 */

import ajax from '../utils/ajax.jsx'

export default store => next => action => {
  if (action.meta && action.meta.ajax) {
    if (!action.meta.url) {
      throw new Error(`action:${action.type}缺少meta.url`)
    }

    // ajax动作发起
    next(action)

    ajax({
      url: action.meta.url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.payload),
      success: (json) => {
        // TODO 合并客户端数据与服务端数据
        store.dispatch({
          type: action.type + '_ok',
          payload: json
        })
      },
      fail: (err) => {
        store.dispatch({
          type: action.type + '_error',
          payload: err,
          error: true
        })
      }
    })

    return
  }

  next(action)
}
