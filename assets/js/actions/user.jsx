
export function create(payload) {
  return {
    type: 'create_user',
    payload,
    meta: {
      ajax: true,
      url: '/abc'
    }
  }
}
