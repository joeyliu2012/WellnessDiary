const React = require('react-native')
const {
  Component,
  PixelRatio,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} = React

const MealDetailPage = require('./MealDetailPage')

class MealListItem extends Component {
  constructor(props) {
    super(props)
    this.handleMealPress = this.handleMealPress.bind(this)
  }

  handleMealPress() {
    const { meal, navigator, photo } = this.props
    navigator.push({
      component: MealDetailPage,
      props: {
        meal,
        photo,
      },
    })
  }

  render() {
    const { meal, photo } = this.props
    return (
      <TouchableOpacity
        onPress={this.handleMealPress}
      >
        <View style={styles.row}>
          <Text>{meal.description}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    height: 50,
    padding: 4,
    borderBottomColor: 'grey',
    borderBottomWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
  },
})

module.exports = MealListItem
