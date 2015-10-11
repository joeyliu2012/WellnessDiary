const { indexBy } = require('lodash')
const { RESULTS_RECEIVED, CLEAR_SEARCH, FOOD_REPORT_RECEIVED } = require('../constants/action-types')

module.exports = function usda(state = {
  query: null,
  results: [],
  foodReports: {},
}, action) {
  switch (action.type) {
  case RESULTS_RECEIVED:
    return {
      ...state,
      ...action.payload,
    }
  case CLEAR_SEARCH:
    return {
      ...state,
      query: null,
      results: [],
    }
  case FOOD_REPORT_RECEIVED:
    const foodReport = action.payload
    return {
      ...state,
      foodReports: {
        ...state.foodReports,
        [foodReport.ndbno]: foodReport,
      }
    }
  default:
    return state
  }
}
