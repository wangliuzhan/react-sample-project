/**
 * ajax请求中间件
 * TODO 使用 superagent
 */

export default store => next => action => {
  if (action.meta && action.meta.ajax) {
    if (!action.meta.url) {
      throw new Error(`action:${action.type}缺少meta.url`)
    }

    fetch(action.meta.url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.payload)
    }).then((res) => {
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
