/**
 * ajax请求中间件
 */

import ajax from '../utils/ajax.jsx'

export default store => next => action => {
  if (action.meta && action.meta.ajax) {
    if (!action.meta.url) {
      throw new Error(`action:${action.type}缺少meta.url`)
    }

    // TODO PENDING
    ajax({
      url: action.meta.url,
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.payload)
    }).then(function(res) {
      // TODO FULFILLED / REJECTED
      // 如何传递客户端需要的数据
      if (res.ok) {
        next(action)
      } else {
        next({
          type: 'ajax_error',
          payload: new Error(res.status),
          error: true
        })
      }
    })

    return
  }

  next(action)
}
