/*eslint-disable */

/**
 * mock仓库，不打包到源代码中
 * 这个文件需要使用commonjs规范写法
 * 不能使用ES 6
 *
 * https://github.com/shuvalov-anton/superagent-mocker
 */

var request = require('superagent')
var mocker = require('superagent-mocker')

mocker.timeout = 1000
const mock = mocker(request)

// SAMPLE
// mock.get('/topics/:id', function(req) {
//   return {
//     id: req.params.id,
//     content: 'Hello World!',
//     headers: req.headers
//   }
// })
//
// mock.post('/topics/:id', function(req) {
//   return {
//     id: req.params.id,
//     body: req.body
//   };
// });

function mockIfOpen(url, response) {
  if (App.useMock) {
    console.log('mocking url:' + url)
    mock.get(url, typeof response === 'function' ? response: function(req) {
      return response
    })
  }
}

mockIfOpen('/abc', {
  id: 1,
  content: 'Hello World!',
  headers: {}
})

mock.post('/topics/:id', function(req) {
  return {
    id: req.params.id,
    body: req.body
  }
})
