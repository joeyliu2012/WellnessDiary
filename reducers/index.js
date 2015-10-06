const { combineReducers } = require('redux')
const todos = require('./todos')

module.exports = combineReducers({
  todos,
})
