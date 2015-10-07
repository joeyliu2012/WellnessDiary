const { RESULTS_RECEIVED, CLEAR_SEARCH } = require('../constants/action-types')
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
}
