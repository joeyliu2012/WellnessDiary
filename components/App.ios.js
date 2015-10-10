const React = require('react-native')
const {
  Component,
  Navigator,
} = React

const MealList = require('./MealList')

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
        configureScene={(route) =>
          route.sceneConfig ? route.sceneConfig : Navigator.SceneConfigs.FloatFromRight
        }
      />
    )
  }
}

module.exports = App
