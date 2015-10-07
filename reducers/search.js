const { RESULTS_RECEIVED } = require('../constants/action-types')

module.exports = function search(state = {
  query: null,
  results: []
}, action) {
  switch (action.type) {
  case RESULTS_RECEIVED:
    return action.payload
  default:
    return state
  }
}
