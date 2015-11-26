function create(gameItem) {
  return {
    type: 'game_create',
    data: gameItem
  }
}

function del(id) {
  return {
    type: 'game_del',
    data: id
  }
}

export {create, del}
