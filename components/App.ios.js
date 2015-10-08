const React = require('react-native')
const {
  Component,
  View,
  Text,
  Navigator,
  TouchableOpacity,
  StyleSheet,
  PixelRatio,
} = React

const MealEntryForm = require('./MealEntryForm')
const MealsList = require('./MealsList')
const SearchPage = require('./SearchPage')
const PhotoCapturePage = require('./PhotoCapturePage')

const routeMapper = {
  LeftButton(route, navigator, index, navState) {
    if (index === 0) return null

    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
          <Text style={[styles.navBarText, styles.navBarButtonText]}>
            Cancel
          </Text>
      </TouchableOpacity>
    )
  },

  RightButton(route, navigator, index, navState) {
    if (!route.nextRoute) return null
    return (
      <TouchableOpacity
        onPress={() => navigator.push(route.nextRoute)}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {route.nextRoute.title}
        </Text>
      </TouchableOpacity>
    )
  },

  Title(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>{route.title}</Text>
    )
  },
}
class App extends Component {
  render() {
    // return <PhotoCapturePage />
    // return <SearchPage />
    return (
      <Navigator
        style={styles.container}
        initialRoute={{
          title: "Meals",
          component: MealsList,
          nextRoute: {
            title: "New Meal",
            component: PhotoCapturePage,
          }
        }}
        renderScene={(route, navigator) => {
          return <route.component navigator={navigator} {...route.props}/>
        }}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.navBar}
            routeMapper={routeMapper}
          />
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    backgroundColor: 'white',
    borderBottomColor: 'grey',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {

  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },})

module.exports = App
