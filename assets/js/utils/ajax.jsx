import request from 'superagent'

export default function ajax(opts) {
  let method = opts.method ? opts.method.toLowerCase() : 'get'
  let req = request[method](opts.url)

  if (opts.data) {
    req = req.send(opts.data)
  }

  if (opts.headers) {
    for(let key in opts.headers) {
      req = req.set(key, opts.headers[key])
    }
  }

  if (opts.timeout) {
    req = req.timeout(opts.timeout)
  }

  if (opts.withCredentials) {
    req = req.withCredentials()
  }

  req.end((err, res) => {
    if (res.ok) {
      opts.success(res.body, res)
    } else {
      opts.fail(res.text, err)
    }
  })

  return req
}
