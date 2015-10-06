const { AsyncStorage } = require('react-native')
const { compose, createStore } = require('redux')
const { persistStore, autoRehydrate } = require('redux-persist')
const reducer = require('../reducers')

const finalCreateStore = compose(
  autoRehydrate()
)(createStore)

module.exports = () => {
  const store = finalCreateStore(reducer)
  persistStore(store, {
    storage: AsyncStorage,
  })
  return store
}
