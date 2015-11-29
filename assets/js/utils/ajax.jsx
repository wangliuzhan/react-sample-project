import request from 'superagent'

export default function ajax(opts) {
  let method = opts.method ? opts.method.toLowerCase() : 'get'
  let req = request[method](opts.url)

  if (opts.data || opts.body) {
    req = req.send(opts.data || opts.body)
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

  if (opts.success || opts.fail) {
    req.end((err, res) => {
      if (res.ok && opts.success) {
        opts.success(res.body, res)
      } else if (!res.ok && opts.fail) {
        opts.fail(res.text, err)
      }
    })

    return req
  }

  return new Promise(function(resolve, reject) {
    req.end((err, res) => {
      if (res.ok) {
        res.req = req
        resolve(res)
      } else {
        reject(err || new Error(res.text))
      }
    })
  })
}
