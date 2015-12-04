/*eslint-disable */

/**
 * https://github.com/shuvalov-anton/superagent-mocker
 */

import request from 'superagent/lib/client'
import mocker from 'superagent-mocker'

// mocker.timeout = 100
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

mock.post('/abc', function(req) {
  return {
    id: 1,
    body: {
      a: 1
    }
  }
})
