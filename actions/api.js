const uuid = require('an-uuid')
const axios = require('axios')
const { START_REQUEST, COMPLETE_REQUEST } = require('../constants/action-types')
const { AUTH_HEADER } = require('../constants/headers')

const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

                                    // This can change later for production
const HOST = process.browser ? '' : 'http://localhost:3000'

function startRequest(id) {
  return {
    type: START_REQUEST,
    payload: id,
  }
}

function completeRequest(id) {
  return {
    type: COMPLETE_REQUEST,
    payload: id,
  }
}

module.exports = function makeApiRequest(requestConfig, actionCreators, _data) {
  return (dispatch, getState) => {
    const REQUEST_ID = uuid()
    const TOKEN = getState().auth.token

    // Set actionCreators
    const {
      start,
      optimistic,
      success,
      error,
      end,
    } = actionCreators

    const headers = TOKEN ? {...DEFAULT_HEADERS, [AUTH_HEADER]: TOKEN } : DEFAULT_HEADERS

    // Request starts...
    dispatch(startRequest(REQUEST_ID))
    start && dispatch(start(REQUEST_ID))
    optimistic && dispatch(optimistic(_data, REQUEST_ID))

    const url = requestConfig.url.indexOf('http') === -1 ? `${HOST}${requestConfig.url}` : requestConfig.url

    request = axios({
      url,
      method: requestConfig.method || 'get',
      params: requestConfig.method === 'get' ? _data : null,
      data: requestConfig.method !== 'get' ? _data : null,
      headers,
    }).then(({data}) => {
      // Successful request completion
      success && dispatch(success(data, REQUEST_ID))
      end && dispatch(end(REQUEST_ID))
      dispatch(completeRequest(REQUEST_ID))
    })
    .catch((err) => {
      // Failure request completion
      error && dispatch(error(err, REQUEST_ID))
      end && dispatch(end(REQUEST_ID))
      dispatch(completeRequest(REQUEST_ID))
    })
  }
}
