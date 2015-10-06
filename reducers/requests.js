const { COMPLETE_REQUEST, START_REQUEST } = require('../constants/action-types')


module.exports = function api(state = {
  requests: [],
  isLoading: 0,
}, action) {
  switch (action.type) {
  case START_REQUEST:
    return {
      ...state,
      isLoading: state.isLoading + 1,
      requests: [
        ...state.requests,
        action.payload,
      ],
    }
  case COMPLETE_REQUEST:
    return {
      ...state,
      isLoading: state.isLoading - 1,
      requests: state.requests.filter((id) => id !== action.payload),
    }
  default:
    return state
  }
}
