const React = require('react-native')
const {
  Component,
  View,
  StyleSheet,
  Text,
} = React

class FoodReport extends Component {
  render() {
    const { report } = this.props
    const cal = report.nutrients.filter((nutrient) =>
      nutrient.name === 'Energy'
    )[0]
    return (
      <View style={styles.container}>
        <Text style={{fontWeight: '500'}}>
          {report.name}
        </Text>
        <Text>
          {cal && `Calories ${cal.value}`}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    height: 60,
  },
})

module.exports = FoodReport
