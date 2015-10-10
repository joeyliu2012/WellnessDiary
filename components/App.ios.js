const React = require('react-native')
const {
  Component,
  Navigator,
} = React

const MealList = require('./MealList')
const PhotoCapturePage = require('./PhotoCapturePage')

class App extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{
          component: MealList,
        }}
        renderScene={(route, navigator) => {
          return <route.component navigator={navigator} {...route.props}/>
        }}
      />
    )
  }
}

module.exports = App
