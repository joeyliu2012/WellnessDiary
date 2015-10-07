const { RECEIVE_TOKEN } = require('../constants/action-types')


module.exports = function auth(state = {
  token: null,
}, action) {
  switch (action.type) {
  case RECEIVE_TOKEN:
    return {
      ...state,
      token: action.payload,
    }
  default:
    return state
  }
}
