export default function(state, action) {
  if (action.type === 'create') {
    console.log('creating...', action.gameItem)
    return {
      gameItem: action.gameItem
    }
  }

  if (action.type === 'del') {
    console.log('deleting...', action.id)
    return state
  }
}
