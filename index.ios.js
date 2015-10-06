const React = require('react-native')
const {
  AppRegistry,
  Component,
} = React
const { Provider } = require('react-redux/native')
const configureStore = require('./store/configureStore')
const store = configureStore()


const { fetchAuthToken } = require ('./actions/auth')

window.store = store
window.fetchAuthToken = fetchAuthToken

const App = require('./components/App')

class WellnessDiary extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    )
  }
}

AppRegistry.registerComponent('WellnessDiary', () => WellnessDiary)
