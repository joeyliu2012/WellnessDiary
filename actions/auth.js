const makeApiRequest = require('./api')
const { userAndTokenReceived } = require('./users')
const { RECEIVE_TOKEN } = require('../constants/action-types')

function receiveToken({token: { value }}) {
  console.log(value)
  return {
    type: RECEIVE_TOKEN,
    payload: value,
  }
}

function fetchAuthToken(email, password) {
  return makeApiRequest({
    url: '/api/auth',
    method: 'post',
  }, {
    success: userAndTokenReceived,
  }, {
    email,
    password,
  })
}

module.exports = {
  receiveToken,
  fetchAuthToken,
}
