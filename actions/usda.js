const { RESULTS_RECEIVED, CLEAR_SEARCH, FOOD_REPORT_RECEIVED } = require('../constants/action-types')
const makeApiRequest = require('./api')

function resultsReceived(data) {
  return {
    type: RESULTS_RECEIVED,
    payload: {
      query: data.list.q,
      results: data.list.item,
    },
  }
}

function clearSearch() {
  return {
    type: CLEAR_SEARCH,
  }
}

function foodReportReceived(data) {
  const { report: { food } } = data
  return {
    type: FOOD_REPORT_RECEIVED,
    payload: food,
  }
}

function fetchFoodReport(ndbno) {
  return makeApiRequest({
    url: 'http://api.nal.usda.gov/ndb/reports/',
    method: 'get',
  }, {
    success: foodReportReceived,
  }, {
    ndbno,
    format: 'json',
    api_key: 'eNk4zU4B2dQhahQywrwzAAdwvkfNlv3moyElAIWu',
  })
}

function queryUSDADatabase(q) {
  return makeApiRequest({
    url: 'http://api.nal.usda.gov/ndb/search/',
    method: 'get',
  }, {
    success: resultsReceived,
  }, {
    q,
    format: 'json',
    api_key: 'eNk4zU4B2dQhahQywrwzAAdwvkfNlv3moyElAIWu',
    max: 30,
  })
}

module.exports = {
  queryUSDADatabase,
  resultsReceived,
  clearSearch,
  fetchFoodReport,
}
