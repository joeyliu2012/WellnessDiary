const { combineReducers } = require('redux')
const auth = require('./auth')
const requests = require('./requests')
const users = require('./users')
const meals = require('./meals')
const search = require('./search')


module.exports = combineReducers({
  auth,
  requests,
  users,
  meals,
  search,
})
