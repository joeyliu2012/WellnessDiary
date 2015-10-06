const { makeApiRequest } = require('./api')
const { receiveToken } = require('./auth')
const { RECEIVE_CURRENT_USER } = require('../constants/action-types')

function receiveCurrentUser(user) {
  return {
    type: RECEIVE_CURRENT_USER,
    payload: user,
  }
}

function userAndTokenReceived(data) {
  return (dispatch) => {
    dispatch(receiveToken(data))
    dispatch(receiveCurrentUser(data))
  }
}

function signupNewUser(fullName, email, password) {
  return makeApiRequest({
    url: '/api/users',
    method: 'post',
  }, {
    success: userAndTokenReceived,
  }, {
    fullName,
    email,
    password,
  })
}

module.exports = {
  receiveCurrentUser,
  userAndTokenReceived,
  signupNewUser,
}
