const React = require('react-native')
const {
  Component,
  Navigator,
} = React

const MealList = require('./MealList')
const MealEntryPage = require('./MealEntryPage')

class App extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{
          component: MealEntryPage,
        }}
        renderScene={(route, navigator) => {
          return <route.component navigator={navigator} {...route.props}/>
        }}
        configureScene={(route) =>
          route.sceneConfig ? route.sceneConfig : Navigator.SceneConfigs.FloatFromRight
        }
      />
    )
  }
}

module.exports = App
