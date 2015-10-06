const { RECEIVE_CURRENT_USER } = require('../constants/action-types')

module.exports = function users(state = {
  currentUser: null,
  usersById: {},
}, action) {
  switch (action.type) {
  case RECEIVE_CURRENT_USER:
    const user = action.payload.user
    return {
      ...state,
      currentUser: user.id,
      usersById: {
        ...state.usersById,
        [user.id]: user,
      },
    }
  default:
    return state
  }
}
