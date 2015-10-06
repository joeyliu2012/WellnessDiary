const { RECEIVE_TOKEN } = require('../constants/action-types')
const { AUTH_HEADER } = require('../constants/headers')


module.exports = function auth(state = {
  token: localStorage.getItem(AUTH_HEADER),
}, action) {
  switch (action.type) {
  case RECEIVE_TOKEN:
    localStorage.setItem(AUTH_HEADER, action.payload)
    return {
      ...state,
      token: action.payload,
    }
  default:
    return state
  }
}
