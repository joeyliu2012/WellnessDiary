const React = require('react-native')
const {
  Component,
  PixelRatio,
  View,
  Text,
  StyleSheet,
  Image,
} = React

class MealListItem extends Component {
  render() {
    const { meal, photo } = this.props
    return (
      <View style={styles.row}>
        <Text>{meal.description}</Text>
      </View>
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
