function create(gameItem) {
  return {
    type: 'create',
    gameItem
  }
}

function del(id) {
  return {
    type: 'del',
    id
  }
}

export default {create, del}
