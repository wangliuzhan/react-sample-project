function create(gameItem) {
  return {
    type: 'create',
    data: gameItem
  }
}

function del(id) {
  return {
    type: 'del',
    data: id
  }
}

export default {create, del}
