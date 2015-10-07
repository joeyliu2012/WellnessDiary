const { RESULTS_RECEIVED, CLEAR_SEARCH } = require('../constants/action-types')

module.exports = function search(state = {
  query: null,
  results: []
}, action) {
  switch (action.type) {
  case RESULTS_RECEIVED:
    return action.payload
  case CLEAR_SEARCH:
    return {
      query: null,
      results: [],
    }
  default:
    return state
  }
}
