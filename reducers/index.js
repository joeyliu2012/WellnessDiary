const { combineReducers } = require('redux')
const auth = require('./auth')
const requests = require('./requests')
const users = require('./users')
const meals = require('./meals')
const usda = require('./usda')
const photos = require('./photos')


module.exports = combineReducers({
  auth,
  requests,
  users,
  meals,
  usda,
  photos,
})
