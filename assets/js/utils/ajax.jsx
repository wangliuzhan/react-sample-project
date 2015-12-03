import request from 'superagent/lib/client'

export default function ajax(opts) {
  let method = opts.method ? opts.method.toLowerCase() : 'get'
  let req = request[method](opts.url, opts.data || opts.body)

  let headers = opts.headers || {
    'Content-Type': 'application/json; charset=UTF-8'
  }

  for(let key in headers) {
    req.set(key, headers[key])
  }

  req.timeout(opts.timeout || 10000)

  if (opts.withCredentials) {
    req.withCredentials()
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
