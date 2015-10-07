const { RESULTS_RECEIVED } = require('../constants/action-types')
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
}
