const React = require('react-native')
const {
  Component,
  Text,
  View,
  StyleSheet,
  PixelRatio,
} = React

class NutrientListItem extends Component {
  render() {
    const { item } = this.props
    return (
      <View style={styles.row}>
        <Text>{item.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    height: 40,
    justifyContent: 'space-around',
    borderBottomColor: 'grey',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
})

module.exports = NutrientListItem
