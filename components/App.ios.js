const React = require('react-native')
const {
  Component,
  View,
  NavigatorIOS,
  StyleSheet,
} = React

const MealEntryForm = require('./MealEntryForm')
const MealsList = require('./MealsList')

class App extends Component {
  render() {
    return (
      <NavigatorIOS
        ref="navigator"
        style={styles.container}
        initialRoute={{
          title: "Meals",
          component: MealsList,
          rightButtonTitle: "Add Meal",
          onRightButtonPress: () => {
            this.refs.navigator.push({
              title: "Enter a meal",
              component: MealEntryForm,
            })
          }
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
})

module.exports = App
