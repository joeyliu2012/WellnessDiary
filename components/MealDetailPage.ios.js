const React = require('react-native')
const {
  Component,
  View,
  StyleSheet,
  PixelRatio,
  Text,
  Image,
  ListView,
} = React

const NavigationBar = require('react-native-navbar')
const FoodReport = require('./FoodReport')
const { connect } = require('react-redux/native')

class MealDetailPage extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    this.state = {
      dataSource: ds.cloneWithRows(props.meal.foodReports),
    }
  }
  render() {
    const { navigator, meal, photo, foodReports } = this.props
    return (
      <View style={styles.container}>
        <NavigationBar
          style={styles.navbar}
          navigator={navigator}
          title="Meal Detail"
        />
        <Image
          style={styles.image}
          source={photo[photo.location]}
        />
        <View style={styles.mealDetailContainer}>
          <Text>{meal.description}</Text>
          <ListView
            style={{flex: 1}}
            dataSource={this.state.dataSource}
            renderRow={(reportId) =>
              <FoodReport report={foodReports[reportId]}/>
            }
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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

module.exports = connect(
  (state) => ({foodReports: state.usda.foodReports})
)(MealDetailPage)
