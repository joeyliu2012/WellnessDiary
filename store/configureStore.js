const { AsyncStorage } = require('react-native')
const { compose, createStore, applyMiddleware } = require('redux')
const thunk = require('redux-thunk')
const createLogger = require('redux-logger')
const { persistStore, autoRehydrate } = require('redux-persist')
const reducer = require('../reducers')

const finalCreateStore = compose(
  applyMiddleware(
    thunk,
    createLogger()
  ),
  autoRehydrate()
)(createStore)

module.exports = () => {
  const store = finalCreateStore(reducer)
  persistStore(store, {
    storage: AsyncStorage,
  })
  return store
}
