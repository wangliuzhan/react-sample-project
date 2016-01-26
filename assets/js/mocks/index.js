/*eslint-disable */

/**
 * https://github.com/shuvalov-anton/superagent-mocker
 */

import request from 'superagent/lib/client'
import mocker from 'superagent-mocker'

// mocker.timeout = 100
const mock = App.useMock ? mocker(request) : {
  post: function() {},
  get: function() {}
}

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

mock.get('/mock/retain2.json', function(req) {
  return {
    body: {
      "statusCode": 200,
      "name": {
        "y0": "付费次数",
        "y1": "占比"
      },
      "content": [{
        "y1": 0.5357142857142857,
        "y0": 1500,
        "x": "1"
      }, {
        "y1": 0.25,
        "y0": 700,
        "x": "4"
      }, {
        "y1": 0.21428571428571427,
        "y0": 600,
        "x": "2-3"
      }],
      "id": "1448090145560J"
    }
  }
})
