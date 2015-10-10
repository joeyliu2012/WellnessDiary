const React = require('react-native')
const {
  Component,
  View,
  StyleSheet,
  PixelRatio,
  Text,
  Image,
} = React

const NavigationBar = require('react-native-navbar')

class MealDetailPage extends Component {
  render() {
    const { navigator, meal, photo } = this.props
    return (
      <View style={styles.container}>
        <NavigationBar
          style={styles.navbar}
          navigator={navigator}
          title="Meal Detail"
        />
        <Image
          style={styles.image}
          source={photo}
        />
        <View style={styles.mealDetailContainer}>
          <Text>{meal.description}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mealDetailContainer: {
    padding: 8,
  },
  navbar: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  image: {
    width: 375,
    height: 375,
  },
})

module.exports = MealDetailPage
